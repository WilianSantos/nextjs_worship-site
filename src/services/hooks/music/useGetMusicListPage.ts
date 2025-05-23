import { useQuery } from '@tanstack/react-query'
import { praiseMusicList } from '@/client/praise/praise'

export const useGetMusicListPage = ({
  page = 1,
  search
}: {
  page?: number
  search?: string
}) => {
  return useQuery({
    queryKey: ['musicPage', page, search],
    queryFn: () => {
      if (search) {
        return praiseMusicList({
          search: search
        })
      } else {
        return praiseMusicList({
          page: page
        })
      }
    },
    enabled: search !== undefined || search !== ''
  })
}
