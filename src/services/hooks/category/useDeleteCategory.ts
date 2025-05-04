import { useMutation } from '@tanstack/react-query'
import { praiseMusicCategoryDelete } from '@/client/praise/praise'

export const useDeleteCategory = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praiseMusicCategoryDelete(id)
  })
}
