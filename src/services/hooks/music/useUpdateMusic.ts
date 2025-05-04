import { useMutation } from '@tanstack/react-query'
import { praiseMusicPartialUpdate } from '@/client/praise/praise'
import { MusicSerializers } from '@/client/schemas'

export const useUpdateMusic = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ values, id }: { values: MusicSerializers; id: number }) => {
      return praiseMusicPartialUpdate(id, {
        author: values.author,
        category_ids: values.category_ids,
        music_chord_ids: values.music_chord_ids,
        music_text: values.music_text,
        music_title: values.music_title,
        music_tone: values.music_tone,
        music_link: values.music_link
      })
    }
  })
}
