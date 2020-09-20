const withImages = require("next-images");
module.exports = withImages({
  esModule: true,
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
});
