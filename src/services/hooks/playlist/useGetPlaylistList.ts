import { useQuery } from '@tanstack/react-query'
import { praisePlaylistList } from '@/client/praise/praise'

export const useGetPlaylistList = ({
  search,
  page
}: {
  search?: string
  page: number
}) => {
  return useQuery({
    queryKey: ['playlistList', search, page],
    queryFn: () => {
      if (search) {
        return praisePlaylistList({
          search: search
        })
      } else {
        return praisePlaylistList({
          page: page
        })
      }
    },
    enabled: search !== undefined || search !== ''
  })
}
