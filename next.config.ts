import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true // <-- Desativa bloqueio do build por erros do ESLint
  },
  /* config options here */
  images: {
    domains: ['127.0.0.1', 'localhost'] // ⬅️ adiciona o domínio aqui
  }
}

export default nextConfig
