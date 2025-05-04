import { useMutation } from '@tanstack/react-query'
import { praiseMemberFunctionsCreate } from '@/client/praise/praise'
import { MemberFunctionsSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useCreateFunction = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: MemberFunctionsSerializers) =>
      praiseMemberFunctionsCreate({
        function_name: toTitleCase(values.function_name),
        description: values.description
      })
  })
}
