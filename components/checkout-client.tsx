'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, setCart } from '@/lib/cart-client';
import { products } from '@/lib/data';

export function CheckoutClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cart] = useState(getCart());

  const lines = useMemo(
    () => cart.map((x) => ({ ...x, product: products.find((p) => p.id === x.productId)! })).filter((x) => x.product),
    [cart]
  );
  const total = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        name: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        address: form.get('address'),
        items: lines.map((line) => ({ productId: line.product.id, quantity: line.quantity }))
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        setError('Could not place order. Please review your details and try again.');
        return;
      }

      if (data.whatsAppUrl) {
        setCart([]);
        window.open(data.whatsAppUrl, '_blank', 'noopener,noreferrer');
        router.push(`/order/success?orderId=${data.orderId}`);
      }
    } catch {
      setError('Network issue while processing order. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <h1 className="font-heading text-3xl">Checkout</h1>
        <input name="name" required placeholder="Full name" className="w-full rounded-xl border px-4 py-3" />
        <input name="phone" required placeholder="Phone" className="w-full rounded-xl border px-4 py-3" />
        <input name="email" required type="email" placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
        <textarea name="address" required placeholder="Address" className="w-full rounded-xl border px-4 py-3" rows={4} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button disabled={loading || !lines.length} className="rounded-full bg-fp-primary px-6 py-3 text-white disabled:opacity-60">
          {loading ? 'Processing...' : 'Confirm & WhatsApp Checkout'}
        </button>
      </form>
      <aside className="h-fit rounded-2xl bg-white p-6 shadow">
        <h2 className="font-heading text-2xl">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          {lines.map((line) => <p key={line.productId}>{line.product.name} × {line.quantity}</p>)}
        </div>
        <p className="mt-4 font-medium">Total: ₹{total.toLocaleString('en-IN')}</p>
      </aside>
    </div>
  );
}
