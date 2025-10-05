/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "build",
  basePath: '/ecommerce',
  assetPrefix: '/ecommerce'
}

module.exports = nextConfig
