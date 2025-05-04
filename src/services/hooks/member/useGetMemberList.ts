import { useQuery } from '@tanstack/react-query'
import { praiseMembersMeList } from '@/client/praise/praise'

export const useGetMemberList = () => {
  return useQuery({
    queryKey: ['memberList'],
    queryFn: () => praiseMembersMeList({ ordering: 'name' })
  })
}
