'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Sidebar } from '@/components/sidebar'
import { useCheckAuth } from '@/services/hooks/token/useCheckAuth'
import { Loader } from '@/components/Loader'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isError, isLoading, status } = useCheckAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (status == 'error') {
      alert('Usuário não autenticado faça o login')
      router.push('/login')
    }
  }, [isError, router, status])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="lg:flex md:flex sm:block h-screen w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
