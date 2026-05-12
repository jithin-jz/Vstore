import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openHelp = (e) => {
    e.preventDefault();
    const message = encodeURIComponent("Hi, I need help with your store services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-canvas/95 backdrop-blur-md py-3 border-b border-hairline"
          : "bg-canvas/80 backdrop-blur-md py-4 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Wordmark */}
        <a href="/" className="flex-shrink-0">
          <span className="text-[20px] leading-none text-ink" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            Store<span className="text-primary">.</span>
          </span>
        </a>

        {/* Mobile search */}
        <div className="ml-auto w-[62%] sm:hidden">
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search assets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-input h-10 pl-9"
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-mute"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Desktop search + categories */}
        <div className="hidden flex-1 items-center justify-center gap-8 px-8 sm:flex">
          <div className="relative w-full max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-mute"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search premium assets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-input h-10 pl-9"
            />
          </div>

          {/* Category links — underlined indigo on active */}
          <div className="flex items-center gap-5">
            {CATEGORIES.slice(0, 5).map((cat) => {
              const active = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    setActiveCategory(cat.value);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative text-[15px] transition-colors ${
                    active ? "text-primary" : "text-ink hover:text-primary"
                  }`}
                  style={{ fontWeight: 300 }}
                >
                  {cat.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right-side CTA: one filled indigo pill per band */}
        <div className="hidden items-center gap-3 sm:flex">
          <button onClick={openHelp} className="btn-pill text-[14px] px-4 py-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.437 2.503 1.189 3.466L6.445 17.83l2.493-.984c.905.518 1.946.814 3.056.815 3.18 0 5.765-2.586 5.766-5.766s-2.549-5.723-5.729-5.723zm3.435 8.167c-.15.422-.866.809-1.21.854-.344.045-.78.075-1.275-.075-.245-.075-.54-.18-.885-.315-1.469-.57-2.43-2.07-2.505-2.175-.075-.105-.6-1.125-.6-2.16 0-1.035.54-1.545.735-1.755.195-.21.435-.255.585-.255s.315.015.45.015c.135 0 .315-.045.495.39.18.435.615 1.485.675 1.605.06.12.09.255.015.405s-.12.33-.24.465c-.12.135-.255.3-.36.405-.12.12-.24.255-.105.48.135.225.6 1.005 1.29 1.62.885.795 1.635 1.035 1.86 1.155.225.12.36.105.495-.045.135-.15.585-.675.735-.9.15-.225.3-.195.495-.12s1.26.6 1.47.705c.21.105.345.165.39.24.06.075.06.45-.105.87z" />
            </svg>
            Support
          </button>
        </div>
      </div>
    </nav>
  );
}
