import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import InstallPrompt from "./components/InstallPrompt";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased pb-20 sm:pb-0">
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Hero />
      <Home
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Footer />
      <BottomNav setSearchQuery={setSearchQuery} />
      <InstallPrompt />
    </div>
  );
}
