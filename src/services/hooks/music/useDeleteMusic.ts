import { useMutation } from '@tanstack/react-query'
import { praiseMusicDelete } from '@/client/praise/praise'

export const useDeleteMusic = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praiseMusicDelete(id)
  })
}
