import { useQuery } from '@tanstack/react-query'
import { praiseMusicCategoryList } from '@/client/praise/praise'

export const useGetCategoryList = () => {
  return useQuery({
    queryKey: ['music-category'],
    queryFn: () => praiseMusicCategoryList()
  })
}
