const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  cert: fs.readFileSync('localhost-cert.pem'),
  key: fs.readFileSync('localhost-key.pem')
});

server.on('request', (req, res) => {
  switch (req.method) {
    case 'GET':
      res.setHeader('Content-Type', 'image/jpeg');
      fs.createReadStream('image.jpg').pipe(res);
      break;
    case 'DELETE':
      console.log('Incoming request headers:', req.headers);
      console.log('I emulate this deletion');
      res.end();
      break;
    case 'PUT':
      console.log('Incoming request headers:', req.headers);
      console.log(`I emulate this ${req.method} method`);
      res.end();
    case 'POST':
      console.log('Incoming request headers:', req.headers);
      console.log(`I emulate this ${req.method} method`);
      res.end();
      break;
    default:
      res.statusCode = 400;
      res.end();
  }
});

console.log("Server listening on port 8000");
server.listen(8000);
