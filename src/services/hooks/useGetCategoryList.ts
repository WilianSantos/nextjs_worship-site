import { useQuery } from '@tanstack/react-query'
import { praiseMusicCategoryList } from '@/client/sdk.gen'
import { api } from '@/services/api'

export const useGetCategoryList = () => {
  return useQuery({
    queryKey: ['categoryList'],
    queryFn: () =>
      praiseMusicCategoryList({
        client: api
      })
  })
}
