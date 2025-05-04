import { useQuery } from '@tanstack/react-query'
import { praiseMusicMusics } from '@/client/praise/praise'

export const useGetMusicsList = ({
  categoryId,
  search
}: {
  categoryId?: string
  search?: string
}) => {
  return useQuery({
    queryKey: ['musicList', categoryId, search],
    queryFn: () =>
      praiseMusicMusics({
        category: categoryId,
        search: search,
        ordering: 'music_title'
      }),
    enabled: categoryId !== undefined || search !== undefined || search !== ''
  })
}
