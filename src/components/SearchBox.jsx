import { useState, useEffect, useRef, useMemo } from "react";
import { CATEGORY_LABEL, POPULAR_CATEGORIES } from "../constants";

const RECENT_KEY = "store:recent-searches";
const MAX_RECENT = 5;
const MAX_RESULTS = 6;

/**
 * Command-palette style search input.
 * - Live autocomplete over `products` with product thumbnails and tnum prices
 * - ⌘K / Ctrl+K global focus shortcut
 * - ↑/↓ to navigate, Enter to select, Esc to close
 * - Persists recent searches in localStorage
 * - Popular-category shortcuts when empty
 */
export default function SearchBox({
  products = [],
  query,
  setQuery,
  setActiveCategory,
  placeholder = "Search products, categories...",
  autoFocus = false,
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Hydrate recent searches from localStorage.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      if (Array.isArray(stored)) setRecent(stored.slice(0, MAX_RECENT));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  // Global ⌘K / Ctrl+K shortcut → focus and open the palette.
  useEffect(() => {
    const handler = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select?.();
        setOpen(true);
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close the dropdown on outside click.
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Compute top matches for the current query.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      )
      .slice(0, MAX_RESULTS);
  }, [products, query]);

  // Reset active cursor when the result set changes.
  useEffect(() => {
    setCursor(0);
  }, [results.length]);

  const commitRecent = (text) => {
    const value = text?.trim();
    if (!value) return;
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, MAX_RECENT);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* storage quota / private mode — non-fatal */
    }
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectProduct = (p) => {
    setQuery(p.title);
    commitRecent(p.title);
    setOpen(false);
    scrollToProducts();
  };

  const selectCategory = (value) => {
    setActiveCategory(value);
    setQuery("");
    setOpen(false);
    scrollToProducts();
  };

  const useRecent = (term) => {
    setQuery(term);
    setOpen(true);
    inputRef.current?.focus();
  };

  const clearRecent = () => {
    setRecent([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
      /* no-op */
    }
  };

  const submitQueryAsFilter = () => {
    if (!query.trim()) return;
    commitRecent(query);
    setOpen(false);
    scrollToProducts();
  };

  const handleKey = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      if (results[cursor]) {
        e.preventDefault();
        selectProduct(results[cursor]);
      } else {
        submitQueryAsFilter();
      }
    }
  };

  // Platform-appropriate kbd hint.
  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);

  const showEmptyPanel = open && !query.trim();
  const showResultsPanel = open && query.trim() && results.length > 0;
  const showNoResults = open && query.trim() && results.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input pill */}
      <div
        className={`flex items-center gap-2 rounded-full border bg-canvas transition-all duration-200 ${
          open
            ? "border-primary shadow-[0_0_0_4px_rgba(83,58,253,0.12)]"
            : "border-hairline-input hover:border-ink-mute"
        }`}
      >
        <svg
          className={`ml-3 h-4 w-4 shrink-0 transition-colors ${
            open ? "text-primary" : "text-ink-mute"
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={query}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-ink placeholder:text-ink-mute outline-none"
          style={{ fontWeight: 300 }}
        />

        {query ? (
          <button
            type="button"
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="mr-1.5 rounded-full p-1 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
            aria-label="Clear search"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <kbd
            className="mr-2 hidden items-center gap-1 rounded-md border border-hairline bg-canvas-soft px-1.5 py-0.5 text-[10px] text-ink-mute sm:flex"
            aria-hidden="true"
          >
            <span>{isMac ? "⌘" : "Ctrl"}</span>
            <span>K</span>
          </kbd>
        )}
      </div>

      {/* Floating panel */}
      {(showEmptyPanel || showResultsPanel || showNoResults) && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[440px] overflow-y-auto card-light shadow-[0_12px_32px_rgba(0,55,112,0.10),0_2px_6px_rgba(0,55,112,0.04)]"
          role="listbox"
        >
          {showResultsPanel && (
            <ul className="p-1.5">
              {results.map((p, i) => {
                const active = cursor === i;
                return (
                  <li
                    key={p._id}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setCursor(i)}
                    onMouseDown={(e) => e.preventDefault() /* keep focus on input */}
                    onClick={() => selectProduct(p)}
                    className={`flex cursor-pointer items-center gap-3 rounded-[8px] px-2.5 py-2 transition-colors ${
                      active ? "bg-primary-subdued" : "hover:bg-canvas-soft"
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-canvas-soft">
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-[14px] leading-tight text-ink"
                        style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
                      >
                        {p.title}
                      </p>
                      <p className="micro-cap text-ink-mute uppercase">
                        {CATEGORY_LABEL[p.category] || "PRODUCT"}
                      </p>
                    </div>
                    <span
                      className="tnum text-[14px] text-ink"
                      style={{ fontWeight: 400 }}
                    >
                      ₹{p.price?.toLocaleString("en-IN")}
                    </span>
                    {active && (
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </li>
                );
              })}
              <li className="mt-1 border-t border-hairline px-3 py-2">
                <button
                  type="button"
                  onClick={submitQueryAsFilter}
                  className="caption text-primary hover:text-primary-deep"
                >
                  View all results for &ldquo;{query}&rdquo; →
                </button>
              </li>
            </ul>
          )}

          {showNoResults && (
            <div className="px-6 py-8 text-center">
              <p className="caption text-ink-mute">
                No results for &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => selectCategory("all")}
                className="btn-pill-secondary mt-4 text-[13px] px-3 py-1.5"
              >
                Browse catalog
              </button>
            </div>
          )}

          {showEmptyPanel && (
            <div className="p-3">
              {recent.length > 0 && (
                <>
                  <div className="flex items-center justify-between px-2 py-1">
                    <p className="micro-cap text-ink-mute uppercase">Recent</p>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="micro-cap text-ink-mute uppercase transition-colors hover:text-primary"
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-1.5 px-2 pb-2">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          onClick={() => useRecent(r)}
                          className="group flex items-center gap-1.5 rounded-full bg-canvas-soft px-3 py-1 text-[13px] text-ink transition-colors hover:bg-primary-subdued hover:text-primary-deep"
                          style={{ fontWeight: 300 }}
                        >
                          <svg className="h-3 w-3 text-ink-mute group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2m6-2a8 8 0 11-16 0 8 8 0 0116 0z" />
                          </svg>
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="micro-cap mt-1 px-2 py-1 uppercase text-ink-mute">
                Popular categories
              </p>
              <ul className="flex flex-wrap gap-1.5 px-2 pb-2">
                {POPULAR_CATEGORIES.map((c) => (
                  <li key={c.value}>
                    <button
                      type="button"
                      onClick={() => selectCategory(c.value)}
                      className="pill-tag-soft transition-colors hover:brightness-95"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
