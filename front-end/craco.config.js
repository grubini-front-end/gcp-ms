const path = require("path");

module.exports = () => ({
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@component": path.resolve(__dirname, "src/component/"),
      "@container": path.resolve(__dirname, "src/container/"),
      "@data": path.resolve(__dirname, "src/data/"),
      "@hoc": path.resolve(__dirname, "src/hoc/"),
      "@network": path.resolve(__dirname, "src/network/"),
      "@resources": path.resolve(__dirname, "src/resources/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
});
