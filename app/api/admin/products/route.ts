import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import { requireAdmin } from '@/lib/admin-api';

const schema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
  primaryImage: z.string().url(),
  hoverImage: z.string().url(),
  badge: z.enum(['NEW', 'BESTSELLER']).nullable(),
  visible: z.boolean()
});

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await db.products.list());
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const saved = await db.products.upsert(parsed.data);
  return NextResponse.json(saved);
}
