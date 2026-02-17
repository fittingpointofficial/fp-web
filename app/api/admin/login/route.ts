import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminSession } from '@/lib/auth';
import { ADMIN_DEFAULTS } from '@/lib/site-config';

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const expectedUser = process.env.ADMIN_USER || ADMIN_DEFAULTS.username;
  const expectedPass = process.env.ADMIN_PASSWORD || ADMIN_DEFAULTS.password;

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
