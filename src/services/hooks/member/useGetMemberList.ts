import { useQuery } from '@tanstack/react-query'
import { praiseMembersMeList } from '@/client/praise/praise'

export const useGetMemberList = ({ search }: { search: string }) => {
  return useQuery({
    queryKey: ['memberList', search],
    queryFn: () => praiseMembersMeList({ ordering: 'name', search: search })
  })
}
