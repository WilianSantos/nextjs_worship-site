import { useQuery } from '@tanstack/react-query'
import { praiseMusicRead } from '@/client/praise/praise'

export const useGetMusic = (id: number) => {
  return useQuery({
    queryKey: ['musicWithId', id],
    queryFn: () => praiseMusicRead(id),
    enabled: !!id
  })
}
