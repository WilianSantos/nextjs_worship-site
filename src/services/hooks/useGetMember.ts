import { useQuery } from '@tanstack/react-query'
import { praiseMeList } from '@/client/praise/praise'

export const useGetMember = () => {
  return useQuery({
    queryKey: ['member'],
    queryFn: () => praiseMeList()
  })
}
