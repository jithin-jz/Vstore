import { useState, useEffect } from "react";
import { fetchProducts } from "../services/sanity";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../constants";

const MOCK_PRODUCTS = [
  { _id: "1", title: "CapCut Pro Assets", price: 299, category: "creative", description: "Premium templates and effects pack for CapCut Pro.", image: null },
  { _id: "2", title: "Next.js SaaS Boilerplate", price: 499, category: "developer", description: "Ultimate starter kit with Auth, DB, and Stripe integration.", image: null },
  { _id: "3", title: "ChatGPT Prompt Bundle", price: 199, category: "ai", description: "500+ curated prompts for marketing and development.", image: null },
  { _id: "4", title: "Notion OS Template", price: 599, category: "saas", description: "All-in-one workspace for personal and professional life.", image: null },
];

export default function Home({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const finalData = (!data || data.length === 0) ? MOCK_PRODUCTS : data;
        setProducts(finalData);
        setFilteredProducts(finalData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProducts(MOCK_PRODUCTS);
        setFilteredProducts(MOCK_PRODUCTS);
        setError("Preview mode enabled");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  return (
    <section id="products" className="bg-white pt-20 pb-8 px-3 sm:pt-24 sm:pb-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="hidden mb-8 text-center sm:mb-12 sm:block">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Digital Solutions
          </h2>
        </div>



        {/* Categories Filter - Instagram Style Pills (Mobile Only) */}
        <div className="mb-6 bg-white py-2 sm:hidden border-b border-[#DBDBDB]">
          <div className="flex items-center justify-start overflow-x-auto px-4 hide-scrollbar">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[13px] font-bold border transition-all ${
                    activeCategory === cat.value
                        ? "bg-[#262626] text-white border-[#262626]"
                      : "bg-white border-[#DBDBDB] text-[#262626]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid - High density like IG explore */}
        <div className="grid grid-cols-2 gap-1 sm:gap-6 lg:grid-cols-4 min-h-[300px]">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-3xl bg-gray-50" />
                <div className="mt-4 h-5 w-3/4 rounded bg-gray-50" />
                <div className="mt-2 h-3 w-1/4 rounded bg-gray-50" />
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xs font-medium sm:text-sm">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
