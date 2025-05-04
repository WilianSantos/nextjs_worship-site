import { useQuery } from '@tanstack/react-query'
import { praiseMeList } from '@/client/praise/praise'

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => praiseMeList(),
    retry: false,
    refetchOnWindowFocus: false
  })
}
