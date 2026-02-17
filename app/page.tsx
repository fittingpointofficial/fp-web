import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { HomeHeroCarousel } from '@/components/home-hero-carousel';
import { CONTACT } from '@/lib/site-config';

const offers = [
  'UMRAH STARTER KITS -15%',
  'BUY 2 GET FREE TASBEEH',
  'FREE SHIPPING ABOVE ₹2999',
  'NEW ARRIVAL: PREMIUM ABAYAS'
];

export default function HomePage() {
  return (
    <main>
      <HomeHeroCarousel />

      <section className="overflow-hidden border-y border-black/10 bg-[#1a3a34] py-3 text-white">
        <div className="offer-marquee whitespace-nowrap text-sm">
          {[...offers, ...offers].map((offer, idx) => (
            <span key={`${offer}-${idx}`} className="mx-6 inline-block tracking-[0.1em]">
              ✦ {offer}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,92vw)] py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fp-secondary">Premium Picks</p>
            <h2 className="font-heading text-4xl">Bespoke Collection</h2>
          </div>
          <Link href="/shop" className="rounded-full border border-fp-primary px-5 py-2 text-sm text-fp-primary">View all products</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.visible).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid w-[min(1120px,92vw)] gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-black/5 p-6 shadow-sm">
            <h3 className="font-heading text-2xl">Why Choose Us</h3>
            <p className="mt-2 text-sm text-black/65">Trusted quality, premium finishing, and modest essentials curated for sacred journeys.</p>
          </article>
          <article className="rounded-2xl border border-black/5 p-6 shadow-sm">
            <h3 className="font-heading text-2xl">Customer Reviews</h3>
            <p className="mt-2 text-sm text-black/65">“Beautiful quality and timely service. Everything came ready for Umrah.”</p>
          </article>
          <article className="rounded-2xl border border-black/5 p-6 shadow-sm">
            <h3 className="font-heading text-2xl">Store Address</h3>
            <p className="mt-2 text-sm text-black/65">{CONTACT.address}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,92vw)] py-16">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1700&q=80"
            alt="seasonal poster"
            width={1700}
            height={700}
            className="h-[320px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/20" />
          <div className="absolute left-8 top-1/2 max-w-xl -translate-y-1/2 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-fp-secondary">Seasonal Offer</p>
            <h3 className="mt-2 font-heading text-4xl">Exclusive Eid & Umrah Offers</h3>
            <p className="mt-3 text-sm text-white/80">Shop premium essentials with curated bundles and gift-ready packaging.</p>
            <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
              Explore Deals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
