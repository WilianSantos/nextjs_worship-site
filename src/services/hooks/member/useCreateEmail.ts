import { useMutation } from '@tanstack/react-query'
import { praiseSendRegistrationEmailCreate } from '@/client/praise/praise'
import { SendEmail } from '@/client/schemas'

export const useCreateEmail = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: SendEmail) =>
      praiseSendRegistrationEmailCreate({
        emails: values.emails
      })
  })
}
