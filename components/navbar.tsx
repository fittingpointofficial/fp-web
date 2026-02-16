import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-fp-bg/95 backdrop-blur">
      <div className="border-b border-black/5 bg-[#102925] px-3 py-2 text-center text-xs text-white">
        Call/WhatsApp: +91 98260 22251 • fitting.point.official@gmail.com • Free shipping on ₹2999+
      </div>
      <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Fitting Point" width={52} height={52} className="h-12 w-12 rounded-full border border-black/10 bg-black/5 p-1" />
          <div>
            <p className="font-heading text-2xl leading-none">Fitting Point</p>
            <p className="text-xs text-black/60">Made to Fit Since 2025</p>
          </div>
        </Link>
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
