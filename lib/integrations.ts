import { createClient } from '@supabase/supabase-js';
import { Order, OrderItem } from './types';

export function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  return `FP-${stamp}`;
}

export async function persistOrderToSupabase(order: Order, items: OrderItem[]) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: true, mode: 'memory' };

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error: orderErr } = await supabase.from('orders').insert({
    id: order.id,
    customer_name: order.name,
    customer_phone: order.phone,
    customer_email: order.email,
    customer_address: order.address,
    total_amount: order.total,
    status: order.status,
    notes: order.notes ?? null
  });
  if (orderErr) throw orderErr;

  const { error: itemErr } = await supabase.from('order_items').insert(
    items.map((i) => ({
      order_id: i.orderId,
      product_id: i.productId,
      quantity: i.quantity,
      unit_price: i.unitPrice
    }))
  );
  if (itemErr) throw itemErr;
  return { ok: true, mode: 'supabase' };
}

export async function appendOrderToGoogleSheets(payload: {
  order: Order;
  itemsLine: string;
  quantity: number;
}) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return { ok: true, skipped: true };

  const body = {
    orderId: payload.order.id,
    dateTime: payload.order.createdAt,
    name: payload.order.name,
    phone: payload.order.phone,
    address: payload.order.address,
    items: payload.itemsLine,
    quantity: payload.quantity,
    total: payload.order.total,
    status: 'NEW'
  };

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed: ${res.status}`);
  }

  return { ok: true };
}

export function createWhatsAppMessage(order: Order, items: Array<{ name: string; qty: number }>) {
  const lines = [
    'NEW ORDER – FITTING POINT',
    `Order ID: ${order.id}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    'Items:',
    ...items.map((item) => `- ${item.name} × ${item.qty}`),
    `Total: ₹${order.total.toLocaleString('en-IN')}`,
    'Thank you'
  ];

  return lines.join('\n');
}
