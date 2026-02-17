import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from './auth';

export async function requireAdmin() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
