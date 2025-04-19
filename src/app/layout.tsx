import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClientProviderWrapper } from '@/components/query-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de Gestão do Ministério de Louvor',
  description:
    'Sistema para gerenciamento de músicas, membros e escalas para ministério de louvor'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <QueryClientProviderWrapper>
        <body className={inter.className}>{children}</body>
      </QueryClientProviderWrapper>
    </html>
  )
}
