import Link from 'next/link';

export default async function OrderSuccess({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto w-[min(700px,92vw)] py-20 text-center">
      <h1 className="font-heading text-4xl">Order Created Successfully</h1>
      <p className="mt-4 text-black/65">Order ID: {params.orderId ?? 'Pending'}</p>
      <p className="mt-4">Your order details have been prepared for WhatsApp submission.</p>
      <Link href="/shop" className="mt-8 inline-block rounded-full bg-fp-primary px-6 py-3 text-white">
        Continue Shopping
      </Link>
    </main>
  );
}
