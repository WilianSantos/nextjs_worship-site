import { useMutation } from '@tanstack/react-query'
import { praiseLogoutCreate } from '@/client/sdk.gen'
import { api } from '../api'

const useCreateLogout = () => {
  return useMutation({
    mutationFn: () =>
      praiseLogoutCreate({
        client: api
      })
  })
}

export { useCreateLogout }
