import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'], 
  },
};

console.log("Next.js configuration applied:", nextConfig);

export default nextConfig;
