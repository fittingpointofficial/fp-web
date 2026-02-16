import { AdminShell } from '@/components/admin-shell';
import { AdminClient } from '@/components/admin-client';
import { AdminLogin } from '@/components/admin-login';
import { isAdminLoggedIn } from '@/lib/auth';

export default function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
  if (!isAdminLoggedIn()) return <AdminLogin />;

  return (
    <AdminShell>
      <h1 className="font-heading text-4xl">Fitting Point Control Center</h1>
      <p className="mt-2 text-sm text-black/60">Low-code visual management for products, orders, and content.</p>
      <div className="mt-8">
        <AdminClient initialTab={searchParams.tab || 'dashboard'} />
      </div>
    </AdminShell>
  );
}
