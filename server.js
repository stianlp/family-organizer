var http = require('http');

var nodeStatic = require('node-static');


var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 8100;

var fileServer = new nodeStatic.Server('./www');

http.createServer(function (req, res) {
    req.addListener('end', function () {
        fileServer.serve(req, res);
    }).resume();
}).listen(port, null);

console.log('Server running at http://' + host + ':' + port + '/');