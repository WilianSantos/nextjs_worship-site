import { useMutation } from '@tanstack/react-query'
import { praiseRequestPasswordResetCreate } from '@/client/praise/praise'
import { RequestPasswordReset } from '@/client/schemas'

export const useCreateEmailPassword = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: RequestPasswordReset) =>
      praiseRequestPasswordResetCreate({
        username: values.username
      })
  })
}
