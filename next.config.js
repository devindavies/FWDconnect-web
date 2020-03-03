/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

console.log({
  FAUNA_SECRET_KEY: process.env.FAUNA_SECRET_KEY
});

module.exports = withBundleAnalyzer({
  target: "serverless",
  env: {
    FAUNA_SECRET_KEY: process.env.FAUNA_SECRET_KEY
  },
  ...withSass()
});
