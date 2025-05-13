import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'https://84e6-143-255-126-18.ngrok-free.app',
      'http://localhost:8000'
    ]
  }
}

export default nextConfig
