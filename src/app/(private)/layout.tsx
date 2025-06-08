'use client'

import React from 'react'

import { Sidebar } from '@/components/sidebar'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="lg:flex md:flex sm:block h-screen w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
