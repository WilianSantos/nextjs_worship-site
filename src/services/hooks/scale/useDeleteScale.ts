import { useMutation } from '@tanstack/react-query'
import { praisePraiseLineupDelete } from '@/client/praise/praise'

export const useDeleteScale = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praisePraiseLineupDelete(id)
  })
}
