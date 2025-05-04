import { useQuery } from '@tanstack/react-query'
import { praiseScaleHistoryList } from '@/client/praise/praise'

const usePraiseScaleHistoryList = () => {
  return useQuery({
    queryKey: ['scaleHistory'],
    queryFn: () => praiseScaleHistoryList()
  })
}

export { usePraiseScaleHistoryList }
