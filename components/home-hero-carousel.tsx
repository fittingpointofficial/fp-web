'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'Luxury Hajj & Umrah Collection 2026',
    subtitle: 'Comfort-first ihram, abayas, prayer essentials and curated travel kits.',
    image:
      'https://images.unsplash.com/photo-1616203711435-d7f8c4f4f4e8?auto=format&fit=crop&w=1800&q=80'
  },
  {
    title: 'Flat 15% Off Umrah Starter Kits',
    subtitle: 'Limited time seasonal offer with premium packaging and fast dispatch.',
    image:
      'https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?auto=format&fit=crop&w=1800&q=80'
  },
  {
    title: 'Made to Fit Since 2025',
    subtitle: 'Elegant, modest and practical essentials made for sacred journeys.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80'
  }
];

export function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[74vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="mx-auto flex min-h-[74vh] w-[min(1120px,92vw)] flex-col justify-center text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fp-secondary">Fitting Point Official</p>
            <h1 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">{slide.title}</h1>
            <p className="mt-4 max-w-xl text-white/85">{slide.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-full bg-fp-primary px-6 py-3 text-sm font-medium">
                Shop Now
              </Link>
              <Link
                href="/checkout"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm"
              >
                Quick Checkout
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-8 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
