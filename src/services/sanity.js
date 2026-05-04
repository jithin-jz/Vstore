import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

export async function fetchProducts() {
  const query = `*[_type == "product" && isActive == true]{
    _id,
    title,
    price,
    description,
    "image": image.asset->url,
    paymentLink
  }`;

  return client.fetch(query);
}
