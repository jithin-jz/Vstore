const runningFeatures = [
  { text: "INSTANT ACTIVATION" },
  { text: "GENUINE ACCESS" },
  { text: "EXPERT SUPPORT" },
  { text: "BEST PRICING" },
  { text: "GLOBAL REACH" },
  { text: "SECURE PAYMENT" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Stripi signature: gradient mesh across the upper third of the hero. */}
      <div
        className="gradient-mesh pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center sm:pt-40 sm:pb-24">
        {/* Eyebrow soft tag */}
        <span className="pill-tag-soft mb-6 hidden sm:inline-flex">
          PREMIUM DIGITAL MARKETPLACE
        </span>

        {/* Display-xxl headline — thin weight, negative tracking = brand signature */}
        <h1 className="display-xxl text-ink">
          Elevate your
          <br />
          <span className="text-primary">digital craft.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-[16px] leading-[1.4] text-ink-secondary sm:text-[18px]" style={{ fontWeight: 300 }}>
          The elite marketplace for professional software, creative assets, and
          high-performance digital tools — delivered instantly.
        </p>

        {/* One filled indigo pill per band + outline secondary */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a href="#products" className="btn-pill">
            Start exploring
          </a>
          <button
            onClick={() => document.getElementById("search-input")?.focus()}
            className="btn-pill-secondary"
          >
            Quick search
          </button>
        </div>
      </div>

      {/* Running features strip (hairline above, caption type) */}
      <div className="relative z-10 hidden border-t border-hairline bg-canvas/70 py-8 backdrop-blur-sm sm:block">
        <div className="marquee gap-20">
          {[...runningFeatures, ...runningFeatures].map((f, i) => (
            <span
              key={i}
              className="caption whitespace-nowrap uppercase tracking-[0.2em] text-ink-mute"
            >
              {f.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
