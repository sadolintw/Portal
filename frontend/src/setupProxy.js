const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dev-gcp-partner.gaiatechs.info',
      changeOrigin: true,
    })
  );
};
