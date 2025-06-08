import { useMutation } from '@tanstack/react-query'
import { praiseCheckAuthCreate } from '@/client/praise/praise'

export const useCheckAuth = () => {
  return useMutation({
    onSuccess: () => {},
    onError: () => {},
    mutationFn: () => praiseCheckAuthCreate()
  })
}
