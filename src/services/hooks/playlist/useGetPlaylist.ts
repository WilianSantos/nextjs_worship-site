import { useQuery } from '@tanstack/react-query'
import { praisePlaylistRead } from '@/client/praise/praise'

export const useGetPlaylist = (id: number) => {
  return useQuery({
    queryKey: ['playlistWithId', id],
    queryFn: () => praisePlaylistRead(id),
    enabled: !!id
  })
}
