export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 py-10 text-sm text-black/60">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Fitting Point — Hajj & Umrah Essentials.</p>
        <p>Premium • Calm • Trusted</p>
      </div>
    </footer>
  );
}
