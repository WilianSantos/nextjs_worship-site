import { useQuery } from '@tanstack/react-query'
import { praiseLineupMemberList } from '@/client/praise/praise'

export const useGetScaleMemberList = ({
  search,
  ordering
}: {
  search?: string
  ordering?: string
}) => {
  return useQuery({
    queryKey: ['scaleMemberList', search, ordering],
    queryFn: () =>
      praiseLineupMemberList({
        search: search,
        ordering: ordering
      }),

    enabled: search !== undefined || search !== ''
  })
}
