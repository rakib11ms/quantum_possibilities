/** @type {import('next').NextConfig} */

const nextConfig = {
   async redirects() {
      return [
         {
            source: '/',
            destination: '/login',
            permanent: false,
         },
      ];
   },
   images: {
      remotePatterns: [
         {
            protocol: 'http',
            hostname: 'quantumpossibilities.eu',
            port: '82',
            // hostname: 'localhost',
            // port: '9000',
         },
      ],
   },
};

module.exports = nextConfig;
