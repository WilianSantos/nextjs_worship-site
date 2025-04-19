import { createClient } from '@hey-api/client-fetch'

export const api = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  credentials: 'include'
})
