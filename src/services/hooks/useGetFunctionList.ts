import { useQuery } from '@tanstack/react-query'
import { praiseMemberFunctionsList } from '@/client/sdk.gen'
import { api } from '../api'

const useGetFunctionList = () => {
  return useQuery({
    queryKey: ['functionList'],
    queryFn: () =>
      praiseMemberFunctionsList({
        client: api
      })
  })
}

export { useGetFunctionList }
