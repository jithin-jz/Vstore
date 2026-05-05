const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

export default function BottomNav({ setSearchQuery }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSearch = (e) => {
    e.preventDefault();
    const el = document.getElementById('search-input');
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setTimeout(() => el.focus(), 600);
    }
  };

  const openHelp = (e) => {
    e.preventDefault();
    const message = encodeURIComponent("Hi, I need help with your store services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white px-6 py-3 sm:hidden">
      <div className="flex items-center justify-between">
        <button onClick={scrollToTop} className="flex flex-col items-center gap-0.5 text-[#262626] active:scale-90">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.75 2.33a.75.75 0 0 0-1.5 0v2.24l-8.72 8.72a.75.75 0 0 0 1.06 1.06l1.22-1.22V21a.75.75 0 0 0 .75.75h5.5a.75.75 0 0 0 .75-.75v-6.5h2.5V21a.75.75 0 0 0 .75.75h5.5a.75.75 0 0 0 .75-.75v-7.89l1.22 1.22a.75.75 0 0 0 1.06-1.06l-8.72-8.72V2.33Z" />
          </svg>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        

        
        <button onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('products');
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }} className="flex flex-col items-center gap-0.5 text-[#8E8E8E] active:scale-90">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[10px] font-medium">Shop</span>
        </button>
        
        <button onClick={scrollToSearch} className="flex flex-col items-center gap-0.5 text-[#8E8E8E] active:scale-90">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] font-medium">Search</span>
        </button>
        
        <button onClick={openHelp} className="flex flex-col items-center gap-0.5 text-[#8E8E8E] active:scale-90">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[10px] font-medium">Help</span>
        </button>
      </div>
    </div>
  );
}
