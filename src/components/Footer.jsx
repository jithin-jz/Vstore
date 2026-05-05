export default function Footer() {
  return (
    <footer className="hidden bg-white border-t border-gray-50 py-6 px-4 sm:block">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-y-4 gap-x-2 sm:flex-nowrap sm:gap-6">
        {/* Brand & Copyright Group */}
        <div className="flex items-center gap-3">
          <a href="/" className="text-lg font-bold tracking-tight text-gray-900">
            Store<span className="text-brand-orange">.</span>
          </a>
          <span className="h-3 w-[1px] bg-gray-200 hidden sm:block" />
          <p className="text-[9px] font-medium text-gray-400">
            © 2026
          </p>
        </div>

        {/* Links Group */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-gray-900">
            <a href="#" className="hover:text-brand-orange transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
