import { useMutation } from '@tanstack/react-query'
import { praiseMemberFunctionsUpdate } from '@/client/praise/praise'
import { MemberFunctionsSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useUpdateFunction = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({
      values,
      id
    }: {
      values: MemberFunctionsSerializers
      id: number
    }) => {
      return praiseMemberFunctionsUpdate(id, {
        function_name: toTitleCase(values.function_name),
        description: values.description
      })
    }
  })
}
