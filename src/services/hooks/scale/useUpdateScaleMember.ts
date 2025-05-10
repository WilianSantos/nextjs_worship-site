import { useMutation } from '@tanstack/react-query'
import { praiseLineupMemberPartialUpdate } from '@/client/praise/praise'
import { LineupMemberSerializers } from '@/client/schemas'

export const useUpdateScaleMember = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({
      values,
      id
    }: {
      values: LineupMemberSerializers
      id: number
    }) =>
      praiseLineupMemberPartialUpdate(id, {
        lineup: values.lineup,
        member: values.member,
        function: values.function
      })
  })
}
