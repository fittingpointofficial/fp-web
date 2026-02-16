import Link from 'next/link';
import { ReactNode } from 'react';

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F4F8]">
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-white p-6">
        <h2 className="font-heading text-2xl">Admin</h2>
        <nav className="mt-6 grid gap-2 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin?tab=products">Products</Link>
          <Link href="/admin?tab=categories">Categories</Link>
          <Link href="/admin?tab=orders">Orders</Link>
          <Link href="/admin?tab=customization">Customization</Link>
          <Link href="/admin?tab=settings">Settings</Link>
        </nav>
      </aside>
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
