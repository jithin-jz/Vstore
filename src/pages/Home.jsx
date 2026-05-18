import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../constants";

export default function Home({ products, loading, activeCategory, setActiveCategory, searchQuery }) {
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="products" className="bg-canvas-soft px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="pill-tag-soft mb-4 hidden sm:inline-flex">CATALOG</span>
          <h2 className="display-lg text-ink sm:text-[40px]">
            Digital solutions, instantly delivered.
          </h2>
          <p className="caption mx-auto mt-3 max-w-xl text-ink-mute">
            Browse the catalog. Tap buy we deliver via WhatsApp or a direct payment link.
          </p>
        </div>

        {/* Mobile filter pills */}
        <div className="mb-8 sm:hidden">
          <div className="flex items-center overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 px-1">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors ${
                      active
                        ? "bg-primary-subdued text-primary-deep border-transparent"
                        : "bg-canvas text-ink-secondary border-hairline"
                    }`}
                    style={{ fontWeight: active ? 400 : 300 }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 min-h-[300px]">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="card-light overflow-hidden animate-pulse">
                <div className="aspect-square bg-canvas-soft" />
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded bg-canvas-soft" />
                  <div className="mt-2 h-3 w-1/3 rounded bg-canvas-soft" />
                </div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-ink-mute">
              <svg className="w-10 h-10 mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="caption">No products match your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
