import { useMutation } from '@tanstack/react-query'
import { praisePraiseLineupCreate } from '@/client/praise/praise'
import { PraiseLineupSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useCreateScale = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: (values: PraiseLineupSerializers) =>
      praisePraiseLineupCreate({
        lineup_event: toTitleCase(values.lineup_event),
        lineup_date: values.lineup_date,
        playlist: values.playlist
      })
  })
}
