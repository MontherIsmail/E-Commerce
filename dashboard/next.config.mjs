/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.pixabay.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
