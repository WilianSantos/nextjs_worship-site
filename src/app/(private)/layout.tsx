'use client'

import React, { useEffect } from 'react'

import { Sidebar } from '@/components/sidebar'
import { useCheckAuth } from '@/services/hooks/token/useCheckAuth'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/Loader'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { mutate, isPending } = useCheckAuth()
  const router = useRouter()

  useEffect(() => {
    mutate(undefined, {
      onSuccess: () => {
        router.push('/')
      },
      onError: () => {
        alert('Usuário não autenticado.')
      }
    })
  })

  if (isPending) {
    return <Loader />
  }
  return (
    <div className="lg:flex md:flex sm:block h-screen w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
