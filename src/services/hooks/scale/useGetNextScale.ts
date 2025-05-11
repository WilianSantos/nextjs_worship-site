import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupGetNextScales } from '@/client/praise/praise'

export const useGetNextScale = () => {
  return useQuery({
    queryKey: ['nextScale'],
    queryFn: () => praisePraiseLineupGetNextScales()
  })
}
