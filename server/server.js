const http2 = require('http2');
const fs = require('fs');
var requests=0;
const server = http2.createSecureServer({
  cert: fs.readFileSync('localhost-cert.pem'),
  key: fs.readFileSync('localhost-key.pem')
});

server.on('request', (req, res) => {
  requests+=1;
  console.log('Incoming request number ',requests,' headers:', req.headers);

  switch (req.method) {
    case 'GET':
      res.setHeader('Content-Type', 'image/jpeg');
      fs.createReadStream('image.jpg').pipe(res);
      res.end();
      break;
    case 'DELETE':
      console.log('I emulate this deletion');
      res.end();
      break;
    case 'PUT':
      console.log(`I emulate this ${req.method} method`);
      res.end();
    case 'POST':
      console.log(`I emulate this ${req.method} method`);
      res.end();
      break;
    default:
      res.statusCode = 400;
      res.end();
  }
});
server.on('error',(error)=>{
  console.error(`An error occurred: ${error}`);

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('An error occurred on the server. Please try again later.');
})

console.log("Server listening on port 8000");
server.listen(8000);
