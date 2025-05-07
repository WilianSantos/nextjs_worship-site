import { useMutation } from '@tanstack/react-query'
import { praisePlaylistPartialUpdate } from '@/client/praise/praise'
import { PlaylistSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useUpdatePlaylist = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({
      values,
      id
    }: {
      values: PlaylistSerializers
      id: number
    }) => {
      return praisePlaylistPartialUpdate(id, {
        playlist_name: toTitleCase(values.playlist_name),
        playlist_date: values.playlist_date,
        music: values.music
      })
    }
  })
}
