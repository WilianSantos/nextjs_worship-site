import { useMutation } from '@tanstack/react-query'
import { praisePlaylistCreate } from '@/client/praise/praise'
import { PlaylistSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useCreatePlaylist = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: PlaylistSerializers) =>
      praisePlaylistCreate({
        playlist_name: toTitleCase(values.playlist_name),
        playlist_date: values.playlist_date,
        music: values.music
      })
  })
}
