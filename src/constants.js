// Category display labels shown in the navbar tabs and mobile filter pills.
// Values must stay in sync with studio/schemaTypes/product.js.
export const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Design", value: "creative" },
  { label: "Tools", value: "developer" },
  { label: "AI", value: "ai" },
  { label: "Streaming", value: "streaming" },
];

// Uppercase labels used as product-card badges and search-result tags.
export const CATEGORY_LABEL = {
  creative: "DESIGN",
  developer: "TOOLS",
  ai: "AI",
  streaming: "STREAMING",
};

// Quick-pick categories shown in the empty search palette.
export const POPULAR_CATEGORIES = [
  { label: "AI", value: "ai" },
  { label: "Design", value: "creative" },
  { label: "Tools", value: "developer" },
  { label: "Streaming", value: "streaming" },
];
