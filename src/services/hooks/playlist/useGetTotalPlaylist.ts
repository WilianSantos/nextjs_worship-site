import { useQuery } from '@tanstack/react-query'
import { praisePlaylistGetTotalPlaylist } from '@/client/praise/praise'

export const useGetTotalPlaylist = () => {
  return useQuery({
    queryKey: ['totalPlaylist'],
    queryFn: () => praisePlaylistGetTotalPlaylist()
  })
}
