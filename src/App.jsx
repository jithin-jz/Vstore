import { useState, useEffect } from "react";
import { fetchProducts } from "./services/sanity";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import InstallPrompt from "./components/InstallPrompt";

// Development fallback so the UI renders even when Sanity is offline or
// the dataset is empty.
const MOCK_PRODUCTS = [
  { _id: "1", title: "CapCut Pro Assets", price: 299, category: "creative", description: "Premium templates and effects pack for CapCut Pro.", image: null },
  { _id: "2", title: "Next.js SaaS Boilerplate", price: 499, category: "developer", description: "Ultimate starter kit with Auth, DB, and Stripe integration.", image: null },
  { _id: "3", title: "ChatGPT Prompt Bundle", price: 199, category: "ai", description: "500+ curated prompts for marketing and development.", image: null },
  { _id: "4", title: "Notion OS Template", price: 599, category: "saas", description: "All-in-one workspace for personal and professional life.", image: null },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((data) => {
        if (cancelled) return;
        const next = (!data || data.length === 0) ? MOCK_PRODUCTS : data;
        setProducts(next);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        if (!cancelled) setProducts(MOCK_PRODUCTS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased pb-20 sm:pb-0">
      <Navbar
        products={products}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Hero />
      <Home
        products={products}
        loading={loading}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
      />
      <Footer />
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}
