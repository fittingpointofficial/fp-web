import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[68vh]">
        <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80" alt="hero" fill className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 to-black/25" />
        <div className="mx-auto w-[min(1120px,92vw)] py-28 text-white">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-fp-secondary">Fitting Point</p>
          <h1 className="max-w-3xl font-heading text-5xl">Premium Islamic Essentials for Hajj & Umrah</h1>
          <p className="mt-5 max-w-xl text-white/85">Calm design, reliable quality, and smooth WhatsApp-powered ordering.</p>
          <Link href="/shop" className="mt-8 inline-block rounded-full bg-fp-primary px-6 py-3">Shop Collection</Link>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,92vw)] py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-3xl">Bespoke Collection</h2>
          <Link href="/shop" className="text-sm text-fp-primary">View all</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.visible).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid w-[min(1120px,92vw)] gap-5 md:grid-cols-3">
          {['Why Choose Us', 'Customer Reviews', 'Guided Packing'].map((title) => (
            <article key={title} className="rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="font-heading text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-black/65">Designed for confidence, comfort, and worship-focused travel.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
