import Lenis from "lenis";

/**
 * Singleton Lenis instance. Initialized once at app startup via `initSmoothScroll()`.
 * Use `smoothScrollTo(target, options)` from anywhere in the app to trigger
 * a programmatic smooth scroll that matches the same easing as wheel scroll.
 */
let lenis = null;

/**
 * Boot Lenis exactly once. Subsequent calls are a no-op so React StrictMode's
 * double-mount or HMR reloads don't spawn duplicate RAF loops.
 */
export function initSmoothScroll() {
  if (lenis || typeof window === "undefined") return lenis;

  lenis = new Lenis({
    // ~1s duration with an exponential-out curve — fast but decelerates softly.
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // Wheel: smooth. Touch: native (forced smoothing on touch feels laggy).
    smoothWheel: true,
    smoothTouch: false,
    // Don't touch scroll on form fields, modal overlays, etc.
    // Users can opt out locally with data-lenis-prevent on any element.
  });

  // Drive Lenis from requestAnimationFrame.
  const raf = (time) => {
    if (!lenis) return;
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Intercept in-page anchor clicks (<a href="#section">) so they use Lenis
  // instead of the browser's native jump-or-scroll behavior.
  document.addEventListener("click", handleAnchorClick);

  return lenis;
}

function handleAnchorClick(e) {
  // Only left-click, no modifier keys (preserve open-in-new-tab, etc.).
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href || href === "#") return;

  const target = document.querySelector(href);
  if (!target) return;

  e.preventDefault();
  smoothScrollTo(target, { offset: -80 });
  history.pushState(null, "", href);
}

/**
 * Scroll smoothly to a target.
 * @param {string | number | HTMLElement} target - CSS selector, pixel Y, or element.
 * @param {object} [options] - Forwarded to Lenis.scrollTo (offset, duration, immediate, ...).
 */
export function smoothScrollTo(target, options = {}) {
  if (!lenis) {
    // Fallback if Lenis hasn't booted yet (SSR / very early call).
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }
  // Sensible default: account for the 64px fixed navbar when jumping to a section.
  lenis.scrollTo(target, { offset: -80, ...options });
}

export function scrollToTop() {
  smoothScrollTo(0, { offset: 0 });
}

/** Exposed for debugging / advanced integrations. */
export function getLenis() {
  return lenis;
}
