'use client'
import { Button } from '@/components/ui/button'
import LoginForm from './FormLogin'
import { useEffect, useState } from 'react'
import SendEmailForm from './SendEmail'
import { useSearchParams } from 'next/navigation'
import { useGetVerifyRegistration } from '@/services/hooks/member/useGetVerifyRegistration'
import { ChangePasswordTokenForm } from './ChangePasswordToken'

export default function LoginPage() {
  const [sendEmailForm, setSendEmailForm] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [isValid, setIsValid] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const reset_token = searchParams.get('reset_token')

  const { data } = useGetVerifyRegistration({ token: token })

  useEffect(() => {
    const verify = () => {
      const res = data?.data

      if (res?.valid) {
        setIsValid(true)
      }
    }
    if (token) verify()
  }, [token, setIsValid, data])

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
        <p className="text-lg text-green-500">{messageSuccess}</p>
        {!sendEmailForm && !isValid ? (
          <LoginForm />
        ) : isValid && reset_token ? (
          <ChangePasswordTokenForm
            setIsValid={() => setIsValid(false)}
            setMessageSuccess={(message: string) => setMessageSuccess(message)}
            reset_token={reset_token}
          />
        ) : (
          <SendEmailForm
            setMessageSuccess={(message: string) => setMessageSuccess(message)}
            setSendEmailForm={() => setSendEmailForm(false)}
          />
        )}
        <div>
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
