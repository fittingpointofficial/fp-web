import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import { requireAdmin } from '@/lib/admin-api';

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['NEW', 'PROCESSING', 'SHIPPED', 'COMPLETED']).optional(),
  notes: z.string().max(2000).optional()
});

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await db.orders.list());
}

export async function PATCH(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, ...patch } = parsed.data;
  const updated = await db.orders.update(id, patch);
  if (!updated) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json(updated);
}
