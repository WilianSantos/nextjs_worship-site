import { useQuery } from '@tanstack/react-query'
import { praiseMeList } from '@/client/sdk.gen'
import { api } from '../api'

const useGetMember = () => {
  return useQuery({
    queryKey: ['member'],
    queryFn: () =>
      praiseMeList({
        client: api
      })
  })
}

export { useGetMember }
