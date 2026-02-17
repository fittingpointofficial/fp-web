import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/store';
import { requireAdmin } from '@/lib/admin-api';

const schema = z.object({
  logoUrl: z.string().optional(),
  whatsappNumber: z
    .string()
    .optional()
    .refine((v) => !v || /^\+?\d{8,15}$/.test(v), 'Invalid WhatsApp number'),
  contactEmail: z
    .string()
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email'),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontStyle: z.enum(['serif', 'sans']).optional(),
  homeBanners: z.array(z.string()).optional()
});

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await db.settings.get());
}

export async function PATCH(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const normalized = {
    ...parsed.data,
    whatsappNumber: parsed.data.whatsappNumber?.replace('+', ''),
    contactEmail: parsed.data.contactEmail?.trim()
  };

  return NextResponse.json(await db.settings.update(normalized));
}
