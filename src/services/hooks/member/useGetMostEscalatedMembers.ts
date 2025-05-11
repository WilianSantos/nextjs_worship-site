import { useQuery } from '@tanstack/react-query'
import { praiseMemberMostEscalatedList } from '@/client/praise/praise'

export const useGetMemberMostEscalatedList = () => {
  return useQuery({
    queryKey: ['mostEscalatedMember'],
    queryFn: () => praiseMemberMostEscalatedList()
  })
}
