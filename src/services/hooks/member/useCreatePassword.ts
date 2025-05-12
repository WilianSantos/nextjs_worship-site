import { useMutation } from '@tanstack/react-query'
import { praiseChangePasswordCreate } from '@/client/praise/praise'
import { ChangePassword } from '@/client/schemas'

export const useCreatePassword = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: ChangePassword) =>
      praiseChangePasswordCreate({
        new_password: values.new_password,
        old_password: values.old_password
      })
  })
}
