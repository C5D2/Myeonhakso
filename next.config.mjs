/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'k.kakaocdn.net',
      'api.fesp.shop',
      'localhost',
      '*.googleusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fesp.shop',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
