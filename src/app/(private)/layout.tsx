'use client'

import React from 'react'
import { redirect } from 'next/navigation'

import { useCreateLogin } from '@/services/hooks/useCreateLogin'

import { Sidebar } from '@/components/sidebar'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { mutate, status } = useCreateLogin()

  React.useEffect(() => {
    mutate()
  }, [])

  React.useEffect(() => {
    if (status === 'error') redirect('/login')
  }, [status])

  return (
    <div className="lg:flex md:flex sm:block h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
