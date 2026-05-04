import { useState, useEffect } from "react";
import { fetchProducts } from "../services/sanity";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Our Products
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Browse our collection and grab what you love.
        </p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="py-24 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            No products available
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Check back later for new arrivals.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
