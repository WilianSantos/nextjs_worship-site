import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupList } from '@/client/praise/praise'

export const useGetScaleList = ({
  search,
  ordering
}: {
  search?: string
  ordering?: string
}) => {
  return useQuery({
    queryKey: ['scaleList', search, ordering],
    queryFn: () =>
      praisePraiseLineupList({
        search: search,
        ordering: ordering
      }),

    enabled: search !== undefined || search !== ''
  })
}
