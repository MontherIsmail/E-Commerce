/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "build",
  basePath: '/ecommerce',
  assetPrefix: '/ecommerce',
  trailingSlash: true
}

module.exports = nextConfig
