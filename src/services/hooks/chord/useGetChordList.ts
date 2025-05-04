import { useQuery } from '@tanstack/react-query'
import { praiseMusicChordList } from '@/client/praise/praise'

export const useGetChordList = () => {
  return useQuery({
    queryKey: ['chords'],
    queryFn: () => praiseMusicChordList()
  })
}
