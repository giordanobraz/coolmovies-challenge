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
  reactStrictMode: true,
};
