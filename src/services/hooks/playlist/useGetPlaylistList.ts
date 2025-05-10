import { useQuery } from '@tanstack/react-query'
import { praisePlaylistGetPlaylists } from '@/client/praise/praise'

export const useGetPlaylistList = ({ search }: { search?: string }) => {
  return useQuery({
    queryKey: ['playlistList', search],
    queryFn: () =>
      praisePlaylistGetPlaylists({
        search: search
      }),

    enabled: search !== undefined || search !== ''
  })
}
