import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import { requireAdmin } from '@/lib/admin-api';

const schema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().min(1),
  sortOrder: z.number().int()
});

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await db.categories.list());
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(await db.categories.upsert(parsed.data));
}
