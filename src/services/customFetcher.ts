const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://84e6-143-255-126-18.ngrok-free.app/api'

export const customFetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T; status: number }> => {
  const fullUrl = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
  const { method = 'GET', headers, body, signal, ...rest } = options

  const isFormData = body instanceof FormData

  const res = await fetch(fullUrl, {
    method,
    headers: isFormData
      ? headers
      : {
          'Content-Type': 'application/json',
          ...headers
        },
    body: isFormData ? body : body ? body : undefined,
    credentials: 'include',
    signal,
    ...rest
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw error
  }

  const contentType = res.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    const json = await res.json()
    return {
      data: json as T,
      status: res.status
    }
  }

  return {
    data: res as unknown as T,
    status: res.status
  }
}
