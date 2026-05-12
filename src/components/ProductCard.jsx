const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f6f9fc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,system-ui' font-size='12' font-weight='400' fill='%2364748d'%3ENO IMAGE%3C/text%3E%3C/svg%3E";

const CATEGORY_LABEL = {
  creative: "ASSET",
  developer: "TOOLKIT",
  ai: "PROMPT",
  streaming: "STREAM",
  education: "COURSE",
  saas: "SAAS",
};

export default function ProductCard({ product }) {
  const { title, price, description, image, paymentLink, category } = product;

  const handleBuy = (e) => {
    e.preventDefault();
    if (paymentLink) {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
      return;
    }
    const storeUrl = window.location.origin;
    const message = encodeURIComponent(
      `Hi, I want to buy *${title}* for ₹${price}\n\n${storeUrl}`
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <article className="group card-light flex flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_24px_rgba(0,55,112,0.08),0_2px_6px_rgba(0,55,112,0.04)]">
      {/* Image — 1:1, light canvas-soft fallback */}
      <div className="relative aspect-square overflow-hidden bg-canvas-soft">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {category && CATEGORY_LABEL[category] && (
          <span className="pill-tag-soft absolute left-3 top-3">
            {CATEGORY_LABEL[category]}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          className="text-[15px] leading-[1.3] text-ink line-clamp-1 sm:text-[18px]"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          {title}
        </h3>

        <p className="caption mt-1.5 text-ink-mute line-clamp-2">
          {description || "Premium digital resource for high-performance workflows."}
        </p>

        {/* Price — tabular figures (tnum) — Stripi's quiet financial-data signature */}
        <div className="mt-3 flex items-baseline gap-1.5 sm:mt-4">
          <span
            className="tnum text-[20px] leading-none text-ink sm:text-[22px]"
            style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
          >
            ₹{price?.toLocaleString("en-IN")}
          </span>
          <span className="caption text-ink-mute">one-time</span>
        </div>

        {/* One filled indigo pill per card (only filled button). */}
        <button
          onClick={handleBuy}
          className="btn-pill mt-4 w-full text-[14px] sm:text-[15px] py-2.5"
        >
          Buy now
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </article>
  );
}
