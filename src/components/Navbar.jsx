import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
          ? "bg-white border-b border-gray-200 shadow-none" 
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="group flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Store<span className="text-brand-orange">.</span>
            </span>
          </a>
        </div>

        {/* Mobile Search Bar */}
        <div className="ml-auto w-[65%] sm:hidden">
          <div className="relative group">
            <input
              id="search-input"
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-100 bg-gray-50/50 pl-10 pr-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-900/5 transition-all"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center: Search & Categories */}
        <div className="hidden flex-1 items-center justify-center gap-10 px-8 sm:flex">
          {/* Refined Search Bar */}
          <div className="relative w-full max-w-sm group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search premium assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-gray-100/50 border border-transparent rounded-2xl text-[13px] font-medium transition-all duration-300 focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-900/5 placeholder:text-gray-400"
            />
          </div>

          {/* Minimalist Categories */}
          <div className="flex items-center gap-1 p-1 bg-gray-100/30 rounded-2xl backdrop-blur-sm">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-2 text-[12px] font-bold transition-all duration-300 rounded-xl ${
                  activeCategory === cat.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={openHelp}
            className="hidden items-center gap-2 rounded-2xl bg-gray-900 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95 sm:flex"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.437 2.503 1.189 3.466L6.445 17.83l2.493-.984c.905.518 1.946.814 3.056.815 3.18 0 5.765-2.586 5.766-5.766s-2.549-5.723-5.729-5.723zm3.435 8.167c-.15.422-.866.809-1.21.854-.344.045-.78.075-1.275-.075-.245-.075-.54-.18-.885-.315-1.469-.57-2.43-2.07-2.505-2.175-.075-.105-.6-1.125-.6-2.16 0-1.035.54-1.545.735-1.755.195-.21.435-.255.585-.255s.315.015.45.015c.135 0 .315-.045.495.39.18.435.615 1.485.675 1.605.06.12.09.255.015.405s-.12.33-.24.465c-.12.135-.255.3-.36.405-.12.12-.24.255-.105.48.135.225.6 1.005 1.29 1.62.885.795 1.635 1.035 1.86 1.155.225.12.36.105.495-.045.135-.15.585-.675.735-.9.15-.225.3-.195.495-.12s1.26.6 1.47.705c.21.105.345.165.39.24.06.075.06.45-.105.87z" />
            </svg>
            Support
          </button>
          


        </div>
      </div>
    </nav>
  );
}
