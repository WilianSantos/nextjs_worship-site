'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LoginForm } from './FormLogin'
import { SendEmailForm } from './SendEmail'
import { ChangePasswordTokenForm } from './ChangePasswordToken'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'
import { Loader } from '@/components/Loader'

function ChangePassword({
  setIsValidFalse,
  setIsValidTrue,
  setMessageSuccess
}: {
  setIsValidFalse: () => void
  setIsValidTrue: () => void
  setMessageSuccess: (message: string) => void
}) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const reset_token = searchParams.get('reset_token') as string

  const { data } = useGetVerifyRegistration({ token })

  useEffect(() => {
    if (token && data?.data?.valid) {
      setIsValidTrue()
    }
  }, [token, data, setIsValidTrue])

  if (reset_token) {
    return (
      <ChangePasswordTokenForm
        setIsValid={setIsValidFalse}
        setMessageSuccess={setMessageSuccess}
        reset_token={reset_token}
      />
    )
  }

  return null
}

export default function LoginPage() {
  const [sendEmailForm, setSendEmailForm] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [isValid, setIsValid] = useState(false)

  return (
    <div className="min-h-screen flex items-center p-5 justify-center bg-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Gestão do Ministério de Louvor
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-orange-600">
          Login
        </h2>

        {messageSuccess && (
          <p className="text-lg text-green-500 text-center">{messageSuccess}</p>
        )}

        <Suspense fallback={<Loader />}>
          {!sendEmailForm && !isValid && <LoginForm />}
          {sendEmailForm && !isValid && (
            <SendEmailForm
              setMessageSuccess={setMessageSuccess}
              setSendEmailForm={() => setSendEmailForm(false)}
            />
          )}
          {isValid && !sendEmailForm && (
            <ChangePassword
              setMessageSuccess={setMessageSuccess}
              setIsValidFalse={() => setIsValid(false)}
              setIsValidTrue={() => setIsValid(true)}
            />
          )}
        </Suspense>

        <div className="text-center">
          <Button
            type="button"
            variant="link"
            size="sm"
            className="text-xs text-blue-900 cursor-pointer"
            onClick={() => setSendEmailForm(true)}
          >
            Esqueceu a senha?
          </Button>
        </div>
      </div>
    </div>
  )
}
