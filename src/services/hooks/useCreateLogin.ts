import { useMutation } from '@tanstack/react-query'
import { praiseLoginCreate } from '@/client/sdk.gen'
import { api } from '../api'

const useCreateLogin = () => {
  return useMutation({
    mutationFn: () =>
      praiseLoginCreate({
        client: api
      })
  })
}

export { useCreateLogin }
