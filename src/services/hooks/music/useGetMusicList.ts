import { useQuery } from '@tanstack/react-query'
import { praiseMusicMusics } from '@/client/praise/praise'

export const useGetMusicList = () => {
  return useQuery({
    queryKey: ['musicList'],
    queryFn: () => praiseMusicMusics()
  })
}
