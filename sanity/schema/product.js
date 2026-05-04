export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active products are shown on the store.",
    },
    {
      name: "paymentLink",
      title: "Payment Link",
      type: "url",
      description:
        "Optional. If provided, Buy Now redirects here instead of WhatsApp.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Must be a valid URL (http or https)"
        ),
    },
  ],
};
