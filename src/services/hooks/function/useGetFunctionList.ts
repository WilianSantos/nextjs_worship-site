import { useQuery } from '@tanstack/react-query'
import { praiseMemberFunctionsList } from '@/client/praise/praise'

export const useGetFunctionList = ({ search }: { search?: string }) => {
  return useQuery({
    queryKey: ['memberFunction', search],
    queryFn: () =>
      praiseMemberFunctionsList({ search: search, ordering: 'function_name' }),
    enabled: search !== undefined || search !== ''
  })
}
