const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
}

module.exports = withNextIntl(nextConfig);