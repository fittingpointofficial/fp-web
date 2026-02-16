import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-fp-bg/90 backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-4">
        <Link href="/" className="font-heading text-2xl">Fitting Point</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/admin" className="rounded-full border border-fp-primary px-4 py-2 text-fp-primary">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
