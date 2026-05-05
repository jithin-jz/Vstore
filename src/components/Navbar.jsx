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
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-[#DBDBDB] h-14 sm:h-16 flex items-center">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="group flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-[#262626]">
              Store<span className="text-[#0095F6]">.</span>
            </span>
          </a>
        </div>

        {/* Mobile Search Bar - Centered like IG explore */}
        <div className="ml-4 flex-1 sm:hidden">
          <div className="relative group">
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg bg-[#EFEFEF] pl-9 pr-3 text-[14px] font-normal text-[#262626] placeholder:text-[#8E8E8E] focus:bg-white focus:ring-1 focus:ring-[#DBDBDB] transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg className="h-4 w-4 text-[#8E8E8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="hidden flex-1 items-center justify-center px-8 sm:flex">
          <div className="relative w-full max-w-xs group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-[#8E8E8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 bg-[#EFEFEF] border-none rounded-lg text-[14px] transition-all focus:bg-white focus:ring-1 focus:ring-[#DBDBDB] placeholder:text-[#8E8E8E]"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={openHelp}
            className="hidden items-center justify-center rounded-[4px] bg-[#0095F6] px-4 py-1.5 text-[14px] font-bold text-white transition-all hover:bg-[#1877F2] active:opacity-70 sm:flex"
          >
            Support
          </button>
        </div>
      </div>
    </nav>
  );
}
