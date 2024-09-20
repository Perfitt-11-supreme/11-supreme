const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/question/recommend ', {
      target: 'https://e035c336-46ca-4e92-9206-6fc8d219b701.mock.pstmn.io',
      changeOrigin: true,
    }),
  );
};