/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ['en-US', 'cs-CZ', 'sk-SK'],
    defaultLocale: 'en-US',
  },
  eslint: {
    dirs: ['src'],
  },
  compiler: {
    styledComponents: true
    // {
    // displayName: false,
    // },
    // ssr: true,
  },
}

module.exports = nextConfig
