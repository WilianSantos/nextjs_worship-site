import { useQuery } from '@tanstack/react-query'
import { praisePlaylistGetMusicsLink } from '@/client/praise/praise'

export const useGetPlaylistLink = (id: number) => {
  return useQuery({
    queryKey: ['playlistLink', id],
    queryFn: () => praisePlaylistGetMusicsLink({ id: id }),
    enabled: !!id
  })
}
