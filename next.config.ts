import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'https://api-gerenc-louvor.onrender.com',
      '127.0.0.1',
      'localhost'
    ]
  }
}

export default nextConfig
