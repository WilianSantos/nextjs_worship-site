'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { LoginForm } from './FormLogin'
import { SendEmailForm } from './SendEmail'

export default function LoginPage() {
  const [sendEmailForm, setSendEmailForm] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

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

        {!sendEmailForm && <LoginForm />}
        {sendEmailForm && (
          <SendEmailForm
            setMessageSuccess={setMessageSuccess}
            setSendEmailForm={() => setSendEmailForm(false)}
          />
        )}

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
