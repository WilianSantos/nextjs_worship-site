import { useMutation } from '@tanstack/react-query'
import { praiseLineupMemberCreate } from '@/client/praise/praise'
import { LineupMemberSerializers } from '@/client/schemas'

export const useCreateScaleMember = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: LineupMemberSerializers) =>
      praiseLineupMemberCreate({
        lineup: values.lineup,
        member: values.member,
        function: values.function
      })
  })
}
