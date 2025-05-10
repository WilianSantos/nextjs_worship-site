import { useQuery } from '@tanstack/react-query'
import { praisePraiseLineupList } from '@/client/praise/praise'

export const useGetScaleListPage = ({
  search,
  page
}: {
  search?: string
  page: number
}) => {
  return useQuery({
    queryKey: ['scaleListPage', search, page],
    queryFn: () => {
      if (search) {
        return praisePraiseLineupList({
          search: search
        })
      }

      return praisePraiseLineupList({
        page: page
      })
    },
    enabled: search !== undefined || search !== ''
  })
}
