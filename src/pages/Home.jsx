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
    <section id="products" className="bg-white pt-4 pb-8 px-3 sm:pt-24 sm:pb-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="hidden mb-8 text-center sm:mb-12 sm:block">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Digital Solutions
          </h2>
        </div>

        {/* Compact Mobile Search Bar */}
        <div className="mx-auto mb-6 max-w-2xl px-4 sm:hidden">
          <div className="relative group">
            <input
              id="search-input"
              type="text"
              placeholder="Search premium assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-2xl border border-gray-100 bg-white pl-11 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-gray-200 focus:ring-4 focus:ring-gray-900/5 transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Filter - Sticky App Tabs (Mobile Only) */}
        <div className="sticky top-[64px] z-30 -mx-3 mb-10 bg-white py-4 backdrop-blur-md sm:hidden">
          <div className="flex items-center justify-start overflow-x-auto px-4 hide-scrollbar sm:justify-center sm:px-0">
            <div className="flex gap-3 sm:flex-wrap sm:justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeCategory === cat.value
                        ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                      : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4 min-h-[300px]">
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
