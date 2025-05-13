'use client'

import { Loader } from '@/components/Loader'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { RegisterForm } from './RegisterForm'

function SearchParams() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const temporary_token = searchParams.get('temporary_token')
  const [email, setEmail] = useState<string>()
  const [isValid, setIsValid] = useState(false)

  const router = useRouter()

  const { data } = useGetVerifyRegistration({ token: token })

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }

    if (data?.data?.valid) {
      if (data.data.email) setEmail(data.data.email)
      setIsValid(true)
    }
  }, [token, data, router])

  if (isValid) return <RegisterForm email={email} token={temporary_token} />
  return null
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Gestão do Ministério de Louvor
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-center">Cadastro</h2>
        <Suspense fallback={<Loader />}>
          <SearchParams />
        </Suspense>
      </div>
    </div>
  )
}
