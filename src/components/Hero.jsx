const runningFeatures = [
  { icon: "⚡", text: "Instant Activation" },
  { icon: "🛡️", text: "Genuine Access" },
  { icon: "💬", text: "Expert Support" },
  { icon: "💰", text: "Best Pricing" },
  { icon: "🌍", text: "Global Reach" },
  { icon: "🔒", text: "Secure Payment" },
];

export default function Hero() {
  return (
    <section className="hidden flex-col items-center overflow-hidden bg-white px-4 pt-16 text-center sm:flex sm:min-h-screen sm:justify-between sm:px-6 sm:pt-32">


      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex flex-col justify-center pt-4 pb-0 sm:flex-1 sm:py-0">
        
        <h1 className="text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.05em] text-gray-900 sm:text-7xl md:text-8xl lg:text-9xl">
          Elevate Your <br />
          <span className="serif-accent italic font-normal text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500">
            Digital Craft
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-[0.85rem] font-medium leading-relaxed text-gray-500/80 sm:mt-10 sm:max-w-2xl sm:text-xl px-4">
          The elite marketplace for professional software, creative assets, and high-performance digital tools. 
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row sm:gap-6">
          <a
            href="#products"
            className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900 px-10 text-base font-bold text-white transition-all hover:bg-black active:scale-95 shadow-2xl shadow-gray-200 sm:h-18 sm:w-auto sm:rounded-full sm:text-lg"
          >
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          
          <button
            onClick={() => document.getElementById('search-input')?.focus()}
            className="hidden h-14 w-full items-center justify-center rounded-2xl border border-gray-100 bg-white/50 px-8 text-sm font-bold text-gray-900 backdrop-blur-md transition-all hover:bg-gray-50 active:scale-95 sm:flex sm:h-18 sm:w-auto sm:rounded-full sm:text-lg"
          >
            Quick Search
          </button>
        </div>
      </div>

      {/* Running Features Marquee */}
      <div className="hidden w-full border-t border-gray-100 bg-white/80 py-2 backdrop-blur-md overflow-hidden sm:block sm:py-12">
        <div className="marquee gap-16 sm:gap-32">
          {[...runningFeatures, ...runningFeatures].map((f, i) => (
            <div key={i} className="flex items-center gap-4 whitespace-nowrap group">
              <span className="text-xl transition-transform group-hover:scale-125 sm:text-2xl">{f.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-gray-900 transition-colors sm:text-xs">
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
