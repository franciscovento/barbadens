/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.BSALE_API_URL,
  },
};

export default nextConfig;
