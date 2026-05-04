import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-bold tracking-tight text-gray-900">
            MStore
          </a>
          <span className="rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
            Shop
          </span>
        </div>
      </nav>

      <Home />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
