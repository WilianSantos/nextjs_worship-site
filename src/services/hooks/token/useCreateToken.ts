import { useMutation } from '@tanstack/react-query'
import { tokenCreate } from '@/client/token/token'
import { TokenObtainPair } from '@/client/schemas'

export const useCreateToken = () => {
  return useMutation({
    onSuccess: () => {},
    onError: () => {},
    mutationFn: (values: TokenObtainPair) =>
      tokenCreate({ username: values.username, password: values.password })
  })
}
