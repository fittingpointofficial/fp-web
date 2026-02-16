import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { categories, products } from '@/lib/data';

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const filtered = products.filter((p) => p.visible && (!category || p.categoryId === category));

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <h1 className="font-heading text-4xl">Shop</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/shop" className="rounded-full border px-4 py-2 text-sm">All</Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/shop?category=${c.id}`} className="rounded-full border px-4 py-2 text-sm">
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
