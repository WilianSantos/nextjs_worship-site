// app/(public)/login/page.tsx
import { Suspense } from 'react'
import ChangePasswordWrapper from './ChangePasswordWrapper'
import { Loader } from '@/components/Loader'

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ChangePasswordWrapper />
    </Suspense>
  )
}
