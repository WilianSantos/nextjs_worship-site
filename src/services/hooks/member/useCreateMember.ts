import { useMutation } from '@tanstack/react-query'
import { praiseRegisterUserCreate } from '@/client/praise/praise'
import { RegisterUser } from '@/client/schemas'

export const useCreateMember = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: RegisterUser) =>
      praiseRegisterUserCreate({
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        name: values.name,
        cell_phone: values.cell_phone,
        token: values.token,
        password: values.password
      })
  })
}
