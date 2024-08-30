/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.GRAPHQL_API || 'http://localhost:5001/graphql',
      },
    ];
  },
  images: {
    domains: ["upload.wikimedia.org", "images-na.ssl-images-amazon.com"],
  },
  reactStrictMode: true,
};
