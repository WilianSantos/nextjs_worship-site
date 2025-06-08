import { BounceLoader } from 'react-spinners'

export const Loader = () => (
  <div className="flex flex-col items-center justify-center w-full">
    <BounceLoader className="text-purple-800" />
  </div>
)
