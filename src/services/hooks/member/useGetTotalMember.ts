import { useQuery } from '@tanstack/react-query'
import { praiseMemberGetTotalMember } from '@/client/praise/praise'

export const useGetTotalMember = () => {
  return useQuery({
    queryKey: ['totalMember'],
    queryFn: () => praiseMemberGetTotalMember()
  })
}
