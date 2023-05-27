/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ['en-US', 'cs-CZ', 'sk-SK'],
    defaultLocale: 'en-US',
  },
  eslint: {
    dirs: ['src'],
  }
}

module.exports = nextConfig
