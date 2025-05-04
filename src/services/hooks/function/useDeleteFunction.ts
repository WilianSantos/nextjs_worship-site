import { useMutation } from '@tanstack/react-query'
import { praiseMemberFunctionsDelete } from '@/client/praise/praise'

export const useDeleteFunction = () => {
  return useMutation({
    onError: () => {},
    onSuccess: () => {},
    mutationFn: ({ id }: { id: number }) => praiseMemberFunctionsDelete(id)
  })
}
