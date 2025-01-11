const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Match API routes
    createProxyMiddleware({
      target: 'http://backend-server.com',
      changeOrigin: true,
    })
  );
};
