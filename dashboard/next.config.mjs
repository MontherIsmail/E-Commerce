/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve dashboard under /ecommerce-admin subpath in production
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/ecommerce-admin' : ''),
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/ecommerce-admin' : ''),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP domains (for development)
      },
    ],
    domains: [
      "cdn.pixabay.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
