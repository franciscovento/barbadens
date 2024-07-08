/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.BSALE_API_URL,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dojiw2m9tvv09.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'bsalemarket.s3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'docs.material-tailwind.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
