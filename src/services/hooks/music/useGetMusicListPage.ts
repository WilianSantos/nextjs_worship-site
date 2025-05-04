import { useQuery } from '@tanstack/react-query'
import { praiseMusicList } from '@/client/praise/praise'

export const useGetMusicListPage = ({ page = 1 }: { page?: number }) => {
  return useQuery({
    queryKey: ['musicPage', page],
    queryFn: () =>
      praiseMusicList({
        page: page,
        ordering: 'music_title'
      })
  })
}
