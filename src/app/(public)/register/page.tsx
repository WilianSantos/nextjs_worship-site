'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/praise/verify-registration-token/?token=${token}`
      )
      const data = await res.json()
      if (data.valid) {
        setEmail(data.email)
        setIsValid(true)
      }
    }
    if (token) verify()
  }, [token])

  if (!token) return <p>Token não fornecido.</p>
  if (!isValid) return <p>Verificando token...</p>

  return (
    <div>
      <h1>Cadastro para {email}</h1>
      {/* formulário de registro aqui */}
    </div>
  )
}
