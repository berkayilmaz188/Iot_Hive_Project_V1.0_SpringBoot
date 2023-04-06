const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.beehiliv.com.tr:8080',
      changeOrigin: true,
    })
  );
};