import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from './auth';

export function requireAdmin() {
  if (!isAdminLoggedIn()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
