export default function Footer() {
  return (
    <footer className="hidden border-t border-hairline bg-canvas px-6 py-16 sm:block">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-10">
          {/* Brand column */}
          <div className="max-w-xs">
            <a href="/" className="text-[20px] leading-none text-ink" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              Store<span className="text-primary">.</span>
            </a>
            <p className="caption mt-4 text-ink-mute">
              Premium digital products, delivered instantly via WhatsApp or a
              secure payment link.
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-3 gap-10 sm:gap-16">
            <div>
              <p className="micro-cap text-ink-mute uppercase">Product</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#products" className="caption text-ink hover:text-primary">Catalog</a></li>
                <li><a href="#products" className="caption text-ink hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="micro-cap text-ink-mute uppercase">Company</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="caption text-ink hover:text-primary">About</a></li>
                <li><a href="#" className="caption text-ink hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <p className="micro-cap text-ink-mute uppercase">Legal</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="caption text-ink hover:text-primary">Terms</a></li>
                <li><a href="#" className="caption text-ink hover:text-primary">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-wrap items-center justify-between border-t border-hairline pt-6">
          <p className="caption text-ink-mute">© 2026 Store. All rights reserved.</p>
          <p className="caption text-ink-mute">Built for creators, developers, and teams.</p>
        </div>
      </div>
    </footer>
  );
}
