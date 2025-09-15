/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.APP_URL],
    },
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig