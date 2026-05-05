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
    <div className="group flex flex-col border border-[#DBDBDB] bg-white transition-all sm:rounded-sm">
      {/* Image Wrap - Set to 1:1 Ratio */}
      <div className="relative aspect-square overflow-hidden bg-white">
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
      <div className="flex flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-bold text-[#262626] line-clamp-1 sm:text-base">
            {title}
          </h3>
          <span className="text-[13px] font-bold text-[#262626] sm:text-base">
            ₹{price?.toLocaleString("en-IN")}
          </span>
        </div>
        
        <p className="mt-1 text-[12px] leading-snug text-[#8E8E8E] line-clamp-2 sm:mt-1.5 sm:text-[13px]">
          {description || "Premium digital resource designed for high-performance workflows."}
        </p>

        <button
          onClick={handleBuy}
          className="mt-4 flex h-8 w-full items-center justify-center rounded-[4px] bg-[#0095F6] text-[12px] font-bold text-white transition-all hover:bg-[#1877F2] active:opacity-70 sm:h-9 sm:text-[13px]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
