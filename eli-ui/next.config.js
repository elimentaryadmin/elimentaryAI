/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withLess = require('next-with-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const resolveAlias = {
  antd$: path.resolve(__dirname, 'src/import/antd'),
};

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  output: 'standalone',
  staticPageGenerationTimeout: 1000,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  lessLoaderOptions: {
    additionalData: `@import "@/styles/antd-variables.less";`,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...resolveAlias,
    };
    return config;
  },
  // routes redirect
  async redirects() {
    return [
      {
        source: '/setup',
        destination: '/setup/connection',
        permanent: true,
      },
    ];
  },
});

module.exports = withBundleAnalyzer(nextConfig);

if (process.env.NODE_ENV === 'development') {
  const suppressedWarnings = [
    'Warning: React does not recognize the `defaultProps`',
  ];
  const realWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && suppressedWarnings.some(entry => args[0].includes(entry))) {
      return;
    }
    realWarn(...args);
  };
}
