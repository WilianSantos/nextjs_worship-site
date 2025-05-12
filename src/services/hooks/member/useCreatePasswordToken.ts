import { useMutation } from '@tanstack/react-query'
import { praisePasswordResetCreate } from '@/client/praise/praise'
import { PasswordReset } from '@/client/schemas'

export const useCreatePasswordToken = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: PasswordReset) =>
      praisePasswordResetCreate({
        new_password: values.new_password,
        token: values.token
      })
  })
}
