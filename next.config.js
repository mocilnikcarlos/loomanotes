/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const pkg = require("./package.json");

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
});
