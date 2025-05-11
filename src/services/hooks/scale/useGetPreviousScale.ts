import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupGetPreviousScales } from '@/client/praise/praise'

export const useGetPreviousScale = () => {
  return useQuery({
    queryKey: ['previousScale'],
    queryFn: () => praisePraiseLineupGetPreviousScales()
  })
}
