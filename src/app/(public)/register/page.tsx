'use client'

import { Loader } from '@/components/Loader'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RegisterForm } from './RegisterForm'

export default function RegisterPage() {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState<string>()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const temporary_token = searchParams.get('temporary_token')

  const { data, isError } = useGetVerifyRegistration({ token: token })

  useEffect(() => {
    const verify = () => {
      const res = data?.data

      if (res?.valid) {
        setEmail(res?.email)
        setIsValid(true)
      }
    }
    if (token) verify()
  }, [token, setEmail, setIsValid, data])

  if (!temporary_token || !isValid || !token) {
    return (
      <div className="flex flex-col gap-2.5 items-center justify-center">
        <Loader />
        <p className="text-2xl  text-gray-700">Validando Informações</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Gestão do Ministério de Louvor
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-center">Cadastro</h2>

        <RegisterForm email={email} token={temporary_token} />
      </div>
    </div>
  )
}
