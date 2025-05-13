'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import LoginForm from './FormLogin'
import SendEmailForm from './SendEmail'
import { ChangePasswordTokenForm } from './ChangePasswordToken'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'

export default function LoginClient() {
  const [sendEmailForm, setSendEmailForm] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [isValid, setIsValid] = useState(false)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const reset_token = searchParams.get('reset_token')

  const { data } = useGetVerifyRegistration({ token })

  useEffect(() => {
    if (token && data?.data?.valid) {
      setIsValid(true)
    }
  }, [token, data])

  const shouldShowChangePassword = isValid && Boolean(reset_token)
  const shouldShowSendEmailForm = sendEmailForm || (token && !isValid)
  const shouldShowLoginForm =
    !shouldShowChangePassword && !shouldShowSendEmailForm

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
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

        {shouldShowLoginForm && <LoginForm />}

        {shouldShowChangePassword && reset_token && (
          <ChangePasswordTokenForm
            setIsValid={() => setIsValid(false)}
            setMessageSuccess={setMessageSuccess}
            reset_token={reset_token}
          />
        )}

        {shouldShowSendEmailForm && (
          <SendEmailForm
            setMessageSuccess={setMessageSuccess}
            setSendEmailForm={() => setSendEmailForm(false)}
          />
        )}

        {shouldShowLoginForm && (
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
        )}
      </div>
    </div>
  )
}
