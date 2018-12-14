var http = require('http');
var processInfo = require('./mymodules/processinfo');

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(processInfo());
  response.end('\nhello world!\n');
}).listen(8080);

console.log('Server started');