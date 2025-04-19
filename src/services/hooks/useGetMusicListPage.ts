import { useQuery } from '@tanstack/react-query'
import { praiseMusicList } from '@/client/sdk.gen'
import { api } from '@/services/api'

export const useGetMusicListPage = ({ page = 1 }: { page?: number }) => {
  return useQuery({
    queryKey: ['musicPage', page],
    queryFn: () =>
      praiseMusicList({
        client: api,
        query: { page }
      })
  })
}
