import { useMutation } from '@tanstack/react-query'
import { praiseMusicCategoryPartialUpdate } from '@/client/praise/praise'
import { MusicCategorySerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useUpdateCategory = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({
      values,
      id
    }: {
      values: MusicCategorySerializers
      id: number
    }) => {
      return praiseMusicCategoryPartialUpdate(id, {
        category_name: toTitleCase(values.category_name)
      })
    }
  })
}
