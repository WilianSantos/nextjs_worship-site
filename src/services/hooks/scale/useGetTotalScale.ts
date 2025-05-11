import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupGetTotalScales } from '@/client/praise/praise'

export const useGetTotalScale = () => {
  return useQuery({
    queryKey: ['totalScale'],
    queryFn: () => praisePraiseLineupGetTotalScales()
  })
}
