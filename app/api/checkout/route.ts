import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import {
  appendOrderToGoogleSheets,
  createWhatsAppMessage,
  generateOrderId,
  persistOrderToSupabase
} from '@/lib/integrations';
import { products } from '@/lib/data';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  address: z.string().min(8),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1)
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const input = parsed.data;
  const orderId = generateOrderId();
  const createdAt = new Date().toISOString();
  const mapped = input.items
    .map((line) => {
      const product = products.find((p) => p.id === line.productId && p.visible);
      if (!product) return null;
      return { product, quantity: line.quantity, lineTotal: product.price * line.quantity };
    })
    .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number; lineTotal: number }>;

  if (!mapped.length) {
    return NextResponse.json({ error: 'No valid products in cart.' }, { status: 400 });
  }

  const total = mapped.reduce((sum, line) => sum + line.lineTotal, 0);
  const order = {
    id: orderId,
    createdAt,
    name: input.name,
    phone: input.phone,
    email: input.email,
    address: input.address,
    total,
    status: 'NEW' as const
  };
  const orderItems = mapped.map((line) => ({
    orderId,
    productId: line.product.id,
    quantity: line.quantity,
    unitPrice: line.product.price
  }));

  await db.orders.create(order, orderItems);

  try {
    await persistOrderToSupabase(order, orderItems);
  } catch (error) {
    console.error('Supabase persistence failed', error);
  }

  try {
    const itemsLine = mapped.map((line) => `${line.product.name} x${line.quantity}`).join(', ');
    const quantity = mapped.reduce((sum, line) => sum + line.quantity, 0);
    await appendOrderToGoogleSheets({ order, itemsLine, quantity });
  } catch (error) {
    console.error('Google Sheets append failed', error);
  }

  const text = createWhatsAppMessage(
    order,
    mapped.map((line) => ({ name: line.product.name, qty: line.quantity }))
  );
  const whatsappNumber = (await db.settings.get()).whatsappNumber || '919826022251';
  const whatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  return NextResponse.json({ orderId, whatsAppUrl });
}
