export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Creative & Design Assets', value: 'creative' },
          { title: 'Developer Toolkits', value: 'developer' },
          { title: 'AI Prompt Packs & Workflows', value: 'ai' },
          { title: 'Streaming Access', value: 'streaming' },
          { title: 'Education Resources', value: 'education' },
          { title: 'SaaS Templates', value: 'saas' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active products are shown on the store.',
    },
    {
      name: 'paymentLink',
      title: 'Payment Link',
      type: 'url',
      description:
        'Optional. If provided, Buy Now redirects here instead of WhatsApp.',
      validation: (Rule) =>
        Rule.uri({scheme: ['http', 'https']}).error(
          'Must be a valid URL (http or https)',
        ),
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
      price: 'price',
    },
    prepare({ title, category, media, price }) {
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'No Category';
      return {
        title,
        subtitle: `${categoryLabel} — ₹${price}`,
        media,
      };
    },
  },
}
