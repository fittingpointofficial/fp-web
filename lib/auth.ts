import { cookies } from 'next/headers';

const TOKEN = 'fp_admin_session';
const TOKEN_VALUE = 'ok';

export function isAdminLoggedIn() {
  const store = cookies();
  return store.get(TOKEN)?.value === TOKEN_VALUE;
}

export function createAdminSession() {
  const store = cookies();
  store.set(TOKEN, TOKEN_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminSession() {
  const store = cookies();
  store.delete(TOKEN);
}
