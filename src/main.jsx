import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initSmoothScroll } from "./lib/scroll";

// Boot Lenis smooth scroll once, before the first React render. The module
// guards against duplicate inits so StrictMode double-mount and HMR don't
// spawn multiple RAF loops.
initSmoothScroll();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
