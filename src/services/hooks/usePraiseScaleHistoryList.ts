import { useQuery } from '@tanstack/react-query'
import { praiseScaleHistoryList } from '@/client/sdk.gen'
import { api } from '../api'

const usePraiseScaleHistoryList = () => {
  return useQuery({
    queryKey: ['scaleHistory'],
    queryFn: () =>
      praiseScaleHistoryList({
        client: api
      })
  })
}

export { usePraiseScaleHistoryList }
