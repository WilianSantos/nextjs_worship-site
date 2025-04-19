import { useQuery } from '@tanstack/react-query'
import { praiseMusicMusics } from '@/client/sdk.gen'
import { api } from '@/services/api'

export const useGetMusicList = () => {
  return useQuery({
    queryKey: ['musicList'],
    queryFn: () =>
      praiseMusicMusics({
        client: api
      })
  })
}
