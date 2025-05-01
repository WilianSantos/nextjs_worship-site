import { useQuery } from '@tanstack/react-query'
import { praiseMemberFunctionsList } from '@/client/praise/praise'

export const useGetFunctionList = () => {
  return useQuery({
    queryKey: ['member-functions'],
    queryFn: () => praiseMemberFunctionsList()
  })
}
