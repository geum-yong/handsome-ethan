const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const path = url.parse(request.url, true).pathname;

  if (request.method === 'GET') {
    if (path === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile(`${__dirname}/public/index.html`, 'utf-8', (err, data) => {
        if (err) return response.end('주소가 없습니다');
        return response.end(data);
      });
    } else if (path === '/index.css') {
      fs.readFile(`${__dirname}/public/assets/styles/index.css`, 'utf-8', (err, data) => {
        if (err) return response.end('주소가 없습니다');
        response.writeHead(200);
        return response.end(data);
      });
    } else if (path === '/favicon.ico') {
      fs.readFile(`${__dirname}/public/assets/images/favicon.ico`, (err, data) => {
        if (err) return response.end('주소가 없습니다');
        response.writeHead(200);
        return response.end(data);
      });
    } else {
      response.statusCode = 404;
      response.end('주소가 없습니다');
    }
  }
});

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('server 구동');
});
