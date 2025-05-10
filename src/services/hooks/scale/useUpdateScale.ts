import { useMutation } from '@tanstack/react-query'
import { praisePraiseLineupPartialUpdate } from '@/client/praise/praise'
import { PraiseLineupSerializers } from '@/client/schemas'
import { toTitleCase } from '@/utils/toTitleCase'

export const useUpdateScale = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({
      values,
      id
    }: {
      values: PraiseLineupSerializers
      id: number
    }) => {
      return praisePraiseLineupPartialUpdate(id, {
        lineup_event: toTitleCase(values.lineup_event),
        lineup_date: values.lineup_date,
        playlist: values.playlist
      })
    }
  })
}
