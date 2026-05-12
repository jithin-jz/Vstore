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
              .title('By Category')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('Design')
                      .child(S.documentList().title('Design').filter('_type == "product" && category == "creative"')),
                    S.listItem()
                      .title('Tools')
                      .child(S.documentList().title('Tools').filter('_type == "product" && category == "developer"')),
                    S.listItem()
                      .title('AI')
                      .child(S.documentList().title('AI').filter('_type == "product" && category == "ai"')),
                    S.listItem()
                      .title('Streaming')
                      .child(S.documentList().title('Streaming').filter('_type == "product" && category == "streaming"')),
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
