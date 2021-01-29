const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://study-tool-api.coderafiki.info/",
      changeOrigin: true,
    })
  );
};