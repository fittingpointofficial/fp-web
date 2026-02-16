import Image from 'next/image';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-[#132521] py-12 text-sm text-white/80">
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Image src="/logo.svg" alt="Fitting Point Logo" width={44} height={44} className="rounded-full bg-white/10 p-1" />
            <p className="font-heading text-2xl text-white">Fitting Point</p>
          </div>
          <p>Premium Hajj & Umrah essentials with elegant quality and dependable support.</p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">Contact</p>
          <p>WhatsApp: +919826022251</p>
          <p>Email: fitting.point.official@gmail.com</p>
          <p className="mt-2 text-white/70">Salman Plaza, 82, Manik Bagh Rd, Nandanvan Colony, Indore, Madhya Pradesh 452014</p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">Why Fitting Point</p>
          <p>• Premium fabrics & finish</p>
          <p>• Fast dispatch and order updates</p>
          <p>• WhatsApp-first customer support</p>
        </div>
      </div>
      <div className="mx-auto mt-8 w-[min(1120px,92vw)] border-t border-white/15 pt-5 text-xs text-white/60">
        © {new Date().getFullYear()} Fitting Point — Made to Fit Since 2025
      </div>
    </footer>
  );
}
