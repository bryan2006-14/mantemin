/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Permite todos los subdominios de Supabase
      },
    ],
  },
}

module.exports = nextConfig