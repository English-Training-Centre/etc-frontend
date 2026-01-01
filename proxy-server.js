/*
npm install express http-proxy-middleware
node proxy-server.js
*/

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/', createProxyMiddleware({
  target: 'http://localhost:4200',
  changeOrigin: true,
}));

app.use('/admin', createProxyMiddleware({
  target: 'http://localhost:4201',
  changeOrigin: true,
  pathRewrite: { '^/admin': '' },
}));

app.use('/student', createProxyMiddleware({
  target: 'http://localhost:4202',
  changeOrigin: true,
  //pathRewrite: { '^/student': 'student' },
}));

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
  console.log('Acesse: / → main-app | /admin | /student');
});
