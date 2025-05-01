import { useMutation } from '@tanstack/react-query'
import { praiseLogoutCreate } from '@/client/praise/praise'

export const useCreateLogout = () => {
  return useMutation({
    mutationFn: () => praiseLogoutCreate()
  })
}
