const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://84e6-143-255-126-18.ngrok-free.app/api'

/**
 * Fetcher customizado que adapta a resposta para o formato esperado pela documentação da API
 * @template T Tipo dos dados retornados pela API
 */
export const customFetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
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
  const responseHeaders = res.headers

  if (res.status === 204 || !contentType?.includes('application/json')) {
    // Para respostas sem conteúdo, criar objeto com formato esperado
    return {
      data: undefined,
      status: res.status,
      headers: responseHeaders
    } as unknown as T
  }

  const json = await res.json()

  // Formato a resposta de acordo com a documentação da API
  const formattedResponse = {
    data: json,
    status: res.status,
    headers: responseHeaders
  }

  return formattedResponse as unknown as T
}
