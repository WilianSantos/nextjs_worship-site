import { useQuery } from '@tanstack/react-query'
import { praiseMusicCategoryList } from '@/client/praise/praise'

export const useGetCategoryList = ({ search }: { search?: string }) => {
  return useQuery({
    queryKey: ['musicCategory', search],
    queryFn: () =>
      praiseMusicCategoryList({ search: search, ordering: 'category_name' }),
    enabled: search !== undefined || search !== ''
  })
}
