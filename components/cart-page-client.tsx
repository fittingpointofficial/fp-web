'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getCart, setCart } from '@/lib/cart-client';
import { products } from '@/lib/data';

export function CartPageClient() {
  const [items, setItems] = useState(getCart());

  useEffect(() => setItems(getCart()), []);

  const enriched = useMemo(() => items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! })).filter((x) => x.product), [items]);
  const subtotal = enriched.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  const updateQty = (productId: string, quantity: number) => {
    const next = items.map((x) => x.productId === productId ? { ...x, quantity: Math.max(1, quantity) } : x);
    setItems(next);
    setCart(next);
  };

  const remove = (productId: string) => {
    const next = items.filter((x) => x.productId !== productId);
    setItems(next);
    setCart(next);
  };

  if (!enriched.length) {
    return <div className="rounded-2xl bg-white p-8 shadow">Your cart is empty. <Link href="/shop" className="text-fp-primary">Start shopping</Link>.</div>;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr,0.6fr]">
      <div className="space-y-3">
        {enriched.map((item) => (
          <article key={item.productId} className="rounded-2xl bg-white p-4 shadow">
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-black/60">₹{item.product.price.toLocaleString('en-IN')}</p>
            <div className="mt-3 flex items-center gap-3">
              <input type="number" min={1} value={item.quantity} onChange={(e) => updateQty(item.productId, Number(e.target.value))} className="w-24 rounded-xl border px-3 py-2" />
              <button onClick={() => remove(item.productId)} className="text-sm text-red-600">Remove</button>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-2xl bg-white p-6 shadow">
        <h2 className="font-heading text-2xl">Summary</h2>
        <p className="mt-4 text-sm">Subtotal: ₹{subtotal.toLocaleString('en-IN')}</p>
        <Link href="/checkout" className="mt-6 inline-block rounded-full bg-fp-primary px-5 py-2 text-white">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}
