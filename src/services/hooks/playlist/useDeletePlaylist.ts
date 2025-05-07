import { useMutation } from '@tanstack/react-query'
import { praisePlaylistDelete } from '@/client/praise/praise'

export const useDeletePlaylist = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praisePlaylistDelete(id)
  })
}
