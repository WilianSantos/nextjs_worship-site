import { useQuery } from '@tanstack/react-query'
import { praiseVerifyRegistrationTokenList } from '@/client/praise/praise'

export const useGetVerifyRegistration = ({
  token
}: {
  token: string | null
}) => {
  return useQuery({
    queryKey: ['verifyRegistration', token],
    queryFn: () => {
      if (token) {
        return praiseVerifyRegistrationTokenList({ token: token })
      }
    },
    enabled: token !== null && token !== undefined
  })
}
