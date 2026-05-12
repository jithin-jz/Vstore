import { useState, useEffect } from "react";
import { smoothScrollTo, scrollToTop } from "../lib/scroll";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  // Sync active tab to scroll position so the indigo highlight follows the user.
  useEffect(() => {
    const handleScroll = () => {
      const products = document.getElementById("products");
      if (!products) return;
      const y = window.scrollY + 200;
      setActive(y >= products.offsetTop ? "shop" : "home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goSearch = () => {
    const el = document.getElementById("search-input");
    if (!el) return;
    smoothScrollTo(el, { offset: -100 });
    // Focus slightly after the scroll begins so iOS doesn't cancel the animation.
    setTimeout(() => el.focus(), 700);
  };

  const openHelp = () => {
    const message = encodeURIComponent("Hi, I need help with your store services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const items = [
    {
      key: "home",
      label: "Home",
      onClick: scrollToTop,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
    },
    {
      key: "shop",
      label: "Shop",
      onClick: () => smoothScrollTo("#products"),
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      ),
    },
    {
      key: "search",
      label: "Search",
      onClick: goSearch,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      ),
    },
    {
      key: "help",
      label: "Help",
      onClick: openHelp,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-hairline bg-canvas/90 px-2 py-2 backdrop-blur-lg sm:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActive(item.key);
                item.onClick();
              }}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition-colors ${
                isActive ? "text-primary" : "text-ink-mute"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
              <span className="text-[10px] tracking-[0.1px]" style={{ fontWeight: 400 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
