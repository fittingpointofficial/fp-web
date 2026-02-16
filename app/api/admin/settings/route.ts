import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import { requireAdmin } from '@/lib/admin-api';

const schema = z.object({
  logoUrl: z.string().optional(),
  whatsappNumber: z.string().regex(/^\d{8,15}$/).optional(),
  contactEmail: z.string().email().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontStyle: z.enum(['serif', 'sans']).optional(),
  homeBanners: z.array(z.string()).optional()
});

export async function GET() {
  const unauthorized = requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await db.settings.get());
}

export async function PATCH(req: Request) {
  const unauthorized = requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(await db.settings.update(parsed.data));
}
