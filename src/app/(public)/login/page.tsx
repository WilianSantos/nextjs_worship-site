'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { ChangePasswordTokenForm } from './ChangePasswordToken'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'
import { Loader } from '@/components/Loader'

export default function ChangePassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const reset_token = searchParams.get('reset_token') as string
  const [isValid, setIsValid] = useState(false)

  const { data } = useGetVerifyRegistration({ token })

  useEffect(() => {
    if (token && data?.data?.valid) {
      setIsValid(true)
    }
  }, [token, data, setIsValid])

  if (reset_token) {
    return (
      <div className="min-h-screen flex items-center p-5 justify-center bg-indigo-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Gestão do Ministério de Louvor
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-center text-orange-600">
            Atualizar Senha
          </h2>

          {messageSuccess && (
            <p className="text-lg text-green-500 text-center">
              {messageSuccess}
            </p>
          )}

          {isValid && <ChangePasswordTokenForm reset_token={reset_token} />}
        </div>
      </div>
    )
  }

  return <Loader />
}
