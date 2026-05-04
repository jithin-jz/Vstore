const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='18' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductCard({ product }) {
  const { title, price, description, image, paymentLink } = product;

  function handleBuy() {
    if (paymentLink) {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    } else {
      const storeUrl = window.location.origin;
      const message = encodeURIComponent(
        `Hi, I want to buy *${title}* for ₹${price}\n\n🛒 ${storeUrl}`
      );
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-950/5 transition-all duration-300 hover:shadow-xl hover:ring-gray-950/10 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-2">
            {title}
          </h3>
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
            ₹{price?.toLocaleString("en-IN")}
          </span>
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-gray-500 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <button
            onClick={handleBuy}
            id={`buy-${product._id}`}
            className="w-full cursor-pointer rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
