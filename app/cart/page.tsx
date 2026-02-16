import { CartPageClient } from '@/components/cart-page-client';

export default function CartPage() {
  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <h1 className="font-heading text-4xl">Cart</h1>
      <div className="mt-8">
        <CartPageClient />
      </div>
    </main>
  );
}
