const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919562449137";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='12' font-weight='600' fill='%239ca3af'%3ENO IMAGE%3C/text%3E%3C/svg%3E";

const CATEGORY_MAP = {
  creative: "Asset",
  developer: "Toolkit",
  ai: "Prompt",
  streaming: "Stream",
  education: "Course",
  saas: "SaaS",
};

export default function ProductCard({ product }) {
  const { title, price, description, image, paymentLink, category } = product;

  function handleBuy(e) {
    e.preventDefault();
    if (paymentLink) {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    } else {
      const storeUrl = window.location.origin;
      const message = encodeURIComponent(
        `Hi, I want to buy *${title}* for ₹${price}\n\n ${storeUrl}`
      );
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm transition-all hover:shadow-md sm:rounded-3xl sm:p-2">
      {/* Image Wrap - Set to 1:1 Ratio */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 sm:rounded-2xl">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
        

      </div>

      {/* Info Section */}
      <div className="flex flex-col p-2 sm:p-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <h3 className="text-xs font-bold text-gray-900 line-clamp-1 sm:text-lg">
            {title}
          </h3>
          <span className="inline-flex w-fit items-center rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-bold text-brand-green-text sm:px-3 sm:py-1 sm:text-sm">
            ₹{price?.toLocaleString("en-IN")}
          </span>
        </div>
        
        <p className="mt-1 text-[10px] leading-relaxed text-gray-500 line-clamp-2 sm:mt-2 sm:text-sm">
          {description || "Premium digital resource designed for high-performance workflows."}
        </p>

        <button
          onClick={handleBuy}
          className="mt-3 flex h-9 w-full items-center justify-center rounded-lg bg-gray-900 text-[10px] font-bold text-white transition-all hover:bg-black active:scale-95 sm:mt-6 sm:h-12 sm:rounded-xl sm:text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
