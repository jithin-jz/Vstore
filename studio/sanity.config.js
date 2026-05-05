import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Store Admin',

  projectId: 'wxzftsz0',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // All Products
            S.listItem()
              .title('All Products')
              .child(S.documentTypeList('product').title('All Products')),
            
            S.divider(),

            // Category Wise
            S.listItem()
              .title('Products by Category')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('Creative & Design')
                      .child(S.documentList().title('Creative Assets').filter('_type == "product" && category == "creative"')),
                    S.listItem()
                      .title('Developer Toolkits')
                      .child(S.documentList().title('Dev Toolkits').filter('_type == "product" && category == "developer"')),
                    S.listItem()
                      .title('AI Prompts')
                      .child(S.documentList().title('AI Assets').filter('_type == "product" && category == "ai"')),
                    S.listItem()
                      .title('Streaming')
                      .child(S.documentList().title('Streaming Access').filter('_type == "product" && category == "streaming"')),
                    S.listItem()
                      .title('Education')
                      .child(S.documentList().title('Edu Resources').filter('_type == "product" && category == "education"')),
                    S.listItem()
                      .title('SaaS Templates')
                      .child(S.documentList().title('SaaS Assets').filter('_type == "product" && category == "saas"')),
                  ])
              ),
            
            // Filter out the singleton types from the global list
            ...S.documentTypeListItems().filter(
              (listItem) => !['product'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
