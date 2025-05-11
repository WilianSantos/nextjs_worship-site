import { useQuery } from '@tanstack/react-query'
import { praiseMusicGetTotalMusic } from '@/client/praise/praise'

export const useGetTotalMusic = () => {
  return useQuery({
    queryKey: ['totalMusic'],
    queryFn: () => praiseMusicGetTotalMusic()
  })
}
