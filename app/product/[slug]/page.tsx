import { notFound } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/store';
import { ProductCard } from '@/components/product-card';

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.products.bySlug(slug);
  if (!product) return notFound();

  const related = (await db.products.list())
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <section className="grid gap-8 md:grid-cols-2">
        <div className="relative h-[480px] overflow-hidden rounded-2xl">
          <Image src={product.primaryImage} alt={product.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-fp-secondary">{product.badge ?? 'Essential'}</p>
          <h1 className="mt-2 font-heading text-4xl">{product.name}</h1>
          <p className="mt-4 text-black/70">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="mt-2 text-sm text-black/60">Stock: {product.stock}</p>
          <div className="mt-6 max-w-xs">
            <ProductCard product={product} />
          </div>
        </div>
      </section>
      <section className="mt-16">
        <h2 className="font-heading text-3xl">Related Items</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
