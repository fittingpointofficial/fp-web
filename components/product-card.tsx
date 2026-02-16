'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { addToCart } from '@/lib/cart-client';

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
      <Link href={`/product/${product.slug}`} className="relative block h-72 overflow-hidden">
        <Image src={product.primaryImage} alt={product.name} fill className="object-cover transition-opacity duration-300 group-hover:opacity-0" />
        <Image src={product.hoverImage} alt={`${product.name} alternate`} fill className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>
      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-fp-secondary">{product.badge ?? 'Essential'}</p>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-black/60">₹{product.price.toLocaleString('en-IN')}</p>
        <button onClick={onAdd} className="w-full rounded-full bg-fp-primary px-4 py-2 text-sm text-white">
          {added ? 'Added ✓' : 'Add To Cart'}
        </button>
      </div>
    </article>
  );
}
