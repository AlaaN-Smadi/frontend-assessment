import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: "",
        pathname: "/**",
      }
    ],
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
  }
};

export default withNextIntl(nextConfig);

