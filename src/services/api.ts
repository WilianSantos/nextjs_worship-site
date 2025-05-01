// src/services/api.ts

export const api = {
  fetch: async (config: {
    url: string
    method: string
    headers?: Record<string, string>
    body?: any
    signal?: AbortSignal
  }) => {
    const { url, method, headers, body, signal } = config

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw error
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return response.json()
    }

    return response
  }
}
