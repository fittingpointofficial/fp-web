import { cookies } from 'next/headers';

const TOKEN = 'fp_admin_session';
const TOKEN_VALUE = 'ok';

export async function isAdminLoggedIn() {
  const store = await cookies();
  return store.get(TOKEN)?.value === TOKEN_VALUE;
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(TOKEN, TOKEN_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(TOKEN);
}
