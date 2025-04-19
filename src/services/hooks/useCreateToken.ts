import { useMutation } from '@tanstack/react-query'
import { tokenCreate } from '@/client/sdk.gen'
import { api } from '../api'
import type { TokenCreateData } from '@/client/types.gen'

const useCreateToken = () => {
  return useMutation({
    mutationFn: (data: TokenCreateData['body']) =>
      tokenCreate({
        client: api,
        body: data
      })
  })
}

export { useCreateToken }
