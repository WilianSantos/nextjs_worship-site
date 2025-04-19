import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const customFetcher = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig // caso queira mesclar opções extras
): Promise<T> => {
  try {
    const mergedConfig = {
      withCredentials: true,
      ...config,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {}),
        ...(options?.headers || {})
      }
    }

    const response: AxiosResponse<T> = await axios(mergedConfig)

    return response.data
  } catch (error: any) {
    // Cancelamento do axios (ou do React Query)
    if (axios.isCancel?.(error) || error?.message === 'canceled') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Requisição cancelada:', error.message)
      }
      return Promise.reject(error) // ou simplesmente: return
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Erro na requisição:',
        error?.response?.data || error.message
      )
    }

    throw error?.response?.data || new Error('Erro desconhecido na requisição')
  }
}
