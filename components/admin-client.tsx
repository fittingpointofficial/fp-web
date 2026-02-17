'use client';

import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Category, Order, Product, SiteSettings } from '@/lib/types';
import { CONTACT } from '@/lib/site-config';

type AdminData = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: SiteSettings;
};

type AdminTab = 'dashboard' | 'products' | 'categories' | 'orders' | 'customization' | 'settings';

const EMPTY_SETTINGS: SiteSettings = {
  logoUrl: '',
  whatsappNumber: CONTACT.whatsappNumber,
  contactEmail: CONTACT.email,
  primaryColor: '#165D54',
  secondaryColor: '#C39A5F',
  fontStyle: 'serif',
  homeBanners: []
};

async function fetchJson<T>(url: string): Promise<{ ok: boolean; status: number; data: T | null }> {
  const res = await fetch(url);
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function AdminClient({ initialTab }: { initialTab: string }) {
  const [tab, setTab] = useState<AdminTab>((initialTab as AdminTab) || 'dashboard');
  const [loadError, setLoadError] = useState('');
  const [data, setData] = useState<AdminData>({
    products: [],
    categories: [],
    orders: [],
    settings: EMPTY_SETTINGS
  });

  useEffect(() => {
    (async () => {
      const [productsRes, categoriesRes, ordersRes, settingsRes] = await Promise.all([
        fetchJson<Product[] | { error: string }>('/api/admin/products'),
        fetchJson<Category[] | { error: string }>('/api/admin/categories'),
        fetchJson<Order[] | { error: string }>('/api/admin/orders'),
        fetchJson<SiteSettings | { error: string }>('/api/admin/settings')
      ]);

      const unauthorized = [productsRes, categoriesRes, ordersRes, settingsRes].some(
        (res) => res.status === 401
      );

      if (unauthorized) {
        window.location.reload();
        return;
      }

      const hasFailure = [productsRes, categoriesRes, ordersRes, settingsRes].some((res) => !res.ok);
      if (hasFailure) {
        setLoadError('Unable to load one or more admin sections. Please refresh.');
      }

      setData({
        products: asArray<Product>(productsRes.data),
        categories: asArray<Category>(categoriesRes.data),
        orders: asArray<Order>(ordersRes.data),
        settings:
          settingsRes.data && !Array.isArray(settingsRes.data) && 'whatsappNumber' in settingsRes.data
            ? (settingsRes.data as SiteSettings)
            : EMPTY_SETTINGS
      });
    })();
  }, []);

  const dashboard = useMemo(() => {
    const totalOrders = data.orders.length;
    const revenue = data.orders.reduce((s, o) => s + (o.total || 0), 0);
    const newOrders = data.orders.filter((o) => o.status === 'NEW').length;
    const lowStock = data.products.filter((p) => p.stock <= 10).length;
    return { totalOrders, revenue, newOrders, lowStock };
  }, [data]);

  const tabs: AdminTab[] = [
    'dashboard',
    'products',
    'categories',
    'orders',
    'customization',
    'settings'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
              className={`rounded-full px-4 py-2 text-sm ${
                tab === name ? 'bg-fp-primary text-white' : 'bg-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <button
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.reload();
          }}
          className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm"
        >
          Logout
        </button>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}

      {tab === 'dashboard' && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card title="Total orders" value={dashboard.totalOrders} />
          <Card title="Revenue" value={`₹${dashboard.revenue.toLocaleString('en-IN')}`} />
          <Card title="New orders" value={dashboard.newOrders} />
          <Card title="Low stock alerts" value={dashboard.lowStock} />
        </div>
      )}

      {tab === 'products' && <ProductManager data={data} setData={setData} />}
      {tab === 'categories' && <CategoryManager data={data} setData={setData} />}
      {tab === 'orders' && <OrderManager data={data} setData={setData} />}
      {tab === 'customization' && <CustomizationManager data={data} setData={setData} />}
      {tab === 'settings' && <SettingsManager data={data} setData={setData} />}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow">
      <p className="text-sm text-black/60">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}

function ProductManager({
  data,
  setData
}: {
  data: AdminData;
  setData: Dispatch<SetStateAction<AdminData>>;
}) {
  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name'));
    const badgeText = String(f.get('badge') || '').toUpperCase();
    const payload: Product = {
      id: crypto.randomUUID(),
      slug: name.toLowerCase().replaceAll(' ', '-'),
      name,
      description: String(f.get('description')),
      price: Number(f.get('price')),
      stock: Number(f.get('stock')),
      categoryId: String(f.get('categoryId')),
      primaryImage: String(f.get('primaryImage')),
      hoverImage: String(f.get('hoverImage')),
      badge: badgeText === 'NEW' || badgeText === 'BESTSELLER' ? badgeText : null,
      visible: f.get('visible') === 'on'
    };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return;
    const saved = (await res.json()) as Product;
    setData((d) => ({ ...d, products: [saved, ...d.products] }));
    e.currentTarget.reset();
  };

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-2 rounded-2xl bg-white p-5 shadow">
        <h3 className="font-heading text-2xl">Add / Edit Product</h3>
        <input name="name" required placeholder="Product name" className="w-full rounded-xl border px-3 py-2" />
        <textarea name="description" required placeholder="Description" className="w-full rounded-xl border px-3 py-2" />
        <div className="grid grid-cols-2 gap-2">
          <input name="price" type="number" required placeholder="Price" className="rounded-xl border px-3 py-2" />
          <input name="stock" type="number" required placeholder="Stock" className="rounded-xl border px-3 py-2" />
        </div>
        <input name="categoryId" required placeholder="Category ID" className="w-full rounded-xl border px-3 py-2" />
        <input name="primaryImage" required placeholder="Primary image URL" className="w-full rounded-xl border px-3 py-2" />
        <input name="hoverImage" required placeholder="Hover image URL" className="w-full rounded-xl border px-3 py-2" />
        <input name="badge" placeholder="Badge: NEW / BESTSELLER" className="w-full rounded-xl border px-3 py-2" />
        <label className="flex items-center gap-2">
          <input name="visible" type="checkbox" defaultChecked />Visible
        </label>
        <button className="rounded-full bg-fp-primary px-5 py-2 text-white">Save product</button>
      </form>
      <div className="rounded-2xl bg-white p-5 shadow">
        <h3 className="font-heading text-2xl">Current Products</h3>
        <div className="mt-3 space-y-2 text-sm">
          {data.products.map((p) => (
            <p key={p.id}>
              {p.name} — stock {p.stock}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryManager({
  data,
  setData
}: {
  data: AdminData;
  setData: Dispatch<SetStateAction<AdminData>>;
}) {
  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name'));

    const payload: Category = {
      id: crypto.randomUUID(),
      name,
      slug: name.toLowerCase().replaceAll(' ', '-'),
      sortOrder: Number(f.get('sortOrder'))
    };

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return;
    const saved = (await res.json()) as Category;
    setData((d) => ({ ...d, categories: [...d.categories, saved] }));
  };

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-2 rounded-2xl bg-white p-5 shadow">
        <h3 className="font-heading text-2xl">Categories</h3>
        <input name="name" required placeholder="Category" className="w-full rounded-xl border px-3 py-2" />
        <input name="sortOrder" type="number" required placeholder="Reorder index" className="w-full rounded-xl border px-3 py-2" />
        <button className="rounded-full bg-fp-primary px-5 py-2 text-white">Save category</button>
      </form>
      <div className="rounded-2xl bg-white p-5 text-sm shadow">
        {data.categories.map((c) => (
          <p key={c.id}>
            {c.sortOrder}. {c.name}
          </p>
        ))}
      </div>
    </section>
  );
}

function OrderManager({
  data,
  setData
}: {
  data: AdminData;
  setData: Dispatch<SetStateAction<AdminData>>;
}) {
  const [query, setQuery] = useState('');
  const filtered = data.orders.filter((o) =>
    `${o.name} ${o.phone}`.toLowerCase().includes(query.toLowerCase())
  );

  const patch = async (id: string, status: Order['status'], notes: string) => {
    const res = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, notes })
    });
    if (!res.ok) return;

    const updated = (await res.json()) as Order;

    setData((d) => ({
      ...d,
      orders: d.orders.map((o) => (o.id === id ? updated : o))
    }));
  };

  return (
    <section className="space-y-4">
      <input
        placeholder="Search by phone or name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border bg-white px-4 py-3"
      />
      {filtered.map((o) => (
        <article key={o.id} className="rounded-2xl bg-white p-4 shadow">
          <p className="font-medium">
            {o.id} — {o.name} ({o.phone})
          </p>
          <p className="text-sm">Total ₹{o.total}</p>
          <div className="mt-2 flex gap-2">
            <select
              defaultValue={o.status}
              onChange={(e) => patch(o.id, e.target.value as Order['status'], o.notes || '')}
              className="rounded-xl border px-2 py-1"
            >
              <option>NEW</option>
              <option>PROCESSING</option>
              <option>SHIPPED</option>
              <option>COMPLETED</option>
            </select>
            <input
              defaultValue={o.notes || ''}
              placeholder="Internal notes"
              onBlur={(e) => patch(o.id, o.status, e.target.value)}
              className="rounded-xl border px-2 py-1"
            />
          </div>
        </article>
      ))}
    </section>
  );
}

function CustomizationManager({
  data,
  setData
}: {
  data: AdminData;
  setData: Dispatch<SetStateAction<AdminData>>;
}) {
  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const patch: Partial<SiteSettings> = {
      logoUrl: String(f.get('logoUrl') || ''),
      homeBanners: [String(f.get('banner1') || ''), String(f.get('banner2') || '')],
      primaryColor: String(f.get('primaryColor') || '#165D54'),
      secondaryColor: String(f.get('secondaryColor') || '#C39A5F'),
      fontStyle: (String(f.get('fontStyle') || 'serif') as SiteSettings['fontStyle'])
    };

    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    if (!res.ok) return;

    const settings = (await res.json()) as SiteSettings;

    setData((d) => ({ ...d, settings }));
  };

  return (
    <form onSubmit={save} className="space-y-2 rounded-2xl bg-white p-5 shadow">
      <h3 className="font-heading text-2xl">Customization</h3>
      <input name="logoUrl" defaultValue={data.settings.logoUrl} placeholder="Logo URL" className="w-full rounded-xl border px-3 py-2" />
      <input name="banner1" defaultValue={data.settings.homeBanners?.[0]} placeholder="Homepage banner 1" className="w-full rounded-xl border px-3 py-2" />
      <input name="banner2" defaultValue={data.settings.homeBanners?.[1]} placeholder="Homepage banner 2" className="w-full rounded-xl border px-3 py-2" />
      <div className="grid grid-cols-2 gap-2">
        <input name="primaryColor" defaultValue={data.settings.primaryColor} className="rounded-xl border px-3 py-2" />
        <input name="secondaryColor" defaultValue={data.settings.secondaryColor} className="rounded-xl border px-3 py-2" />
      </div>
      <select name="fontStyle" defaultValue={data.settings.fontStyle || 'serif'} className="w-full rounded-xl border px-3 py-2">
        <option value="serif">Serif</option>
        <option value="sans">Sans</option>
      </select>
      <button className="rounded-full bg-fp-primary px-5 py-2 text-white">Save customization</button>
    </form>
  );
}

function SettingsManager({
  data,
  setData
}: {
  data: AdminData;
  setData: Dispatch<SetStateAction<AdminData>>;
}) {
  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const patch = {
      whatsappNumber: String(f.get('whatsappNumber') || ''),
      contactEmail: String(f.get('contactEmail') || '')
    };
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    if (!res.ok) return;

    const settings = (await res.json()) as SiteSettings;
    setData((d) => ({ ...d, settings }));
  };

  return (
    <form onSubmit={save} className="space-y-2 rounded-2xl bg-white p-5 shadow">
      <h3 className="font-heading text-2xl">Settings</h3>
      <input name="whatsappNumber" defaultValue={data.settings.whatsappNumber} className="w-full rounded-xl border px-3 py-2" />
      <input name="contactEmail" defaultValue={data.settings.contactEmail} className="w-full rounded-xl border px-3 py-2" />
      <button className="rounded-full bg-fp-primary px-5 py-2 text-white">Save settings</button>
    </form>
  );
}
