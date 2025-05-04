import { useMutation } from '@tanstack/react-query'
import { praiseMusicCategoryCreate } from '@/client/praise/praise'
import { MusicCategorySerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useCreateCategory = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: MusicCategorySerializers) =>
      praiseMusicCategoryCreate({
        category_name: toTitleCase(values.category_name)
      })
  })
}
