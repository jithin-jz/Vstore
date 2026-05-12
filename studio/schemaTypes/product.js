// Short, normal category names used across the schema dropdown and the
// preview subtitle. Keep values in sync with src/constants.js on the frontend.
const CATEGORY_OPTIONS = [
  { title: 'Design', value: 'creative' },
  { title: 'Tools', value: 'developer' },
  { title: 'AI', value: 'ai' },
  { title: 'Streaming', value: 'streaming' },
]

const CATEGORY_LABEL = Object.fromEntries(
  CATEGORY_OPTIONS.map((c) => [c.value, c.title])
)

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
        list: CATEGORY_OPTIONS,
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
        Rule.uri({ scheme: ['http', 'https'] }).error(
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
      const label = CATEGORY_LABEL[category] || 'Uncategorized'
      return {
        title,
        subtitle: `${label} · ₹${price ?? 0}`,
        media,
      }
    },
  },
}
