import { useMutation } from '@tanstack/react-query'
import { praiseLineupMemberDelete } from '@/client/praise/praise'

export const useDeleteScaleMember = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praiseLineupMemberDelete(id)
  })
}
