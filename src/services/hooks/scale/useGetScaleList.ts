import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupGetScales } from '@/client/praise/praise'

export const useGetScaleList = () => {
  return useQuery({
    queryKey: ['scaleList'],
    queryFn: () => praisePraiseLineupGetScales()
  })
}
