import { useQuery } from '@tanstack/react-query'
import { praiseMusicMostPlayedList } from '@/client/praise/praise'

export const useGetMusicMostPlayedList = () => {
  return useQuery({
    queryKey: ['mostPlayedMusic'],
    queryFn: () => praiseMusicMostPlayedList()
  })
}
