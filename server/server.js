const http2 = require('http2');
const fs = require('fs');

/* const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
 */
//inserire options, come parametro di create server
const server = http2.createServer( (req, res) => {
  if (req.method === 'POST') {
    console.log(' ',req.headers[':method'],req.headers[':path']);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.writeFile('file.txt', body, err => {
        if (err) {
          res.statusCode = 500;
          res.end('Failed to write file');
          return;
        }
        res.statusCode = 200;
        res.end('File created');
      });
    });
  } else {
    res.statusCode = 400;
    res.end('Bad request');
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
