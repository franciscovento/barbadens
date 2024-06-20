/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.BSALE_API_URL,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dojiw2m9tvv09.cloudfront.net',
        port: '',
      },
    ],
  },
};

export default nextConfig;
