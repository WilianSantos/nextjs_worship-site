import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: './openapi3.json',
    output: {
      mode: 'tags-split',
      target: './src/client',
      schemas: './src/client/schemas',
      client: 'fetch', // 👈 NÃO use react-query
      httpClient: 'fetch',
      override: {
        mutator: {
          path: './src/services/customFetcher.ts',
          name: 'customFetcher'
        }
      }
    }
  }
})
