
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
http.createServer(function(request,response){
    var raw = fs.createReadStream('test.txt');
    var acceptEncoding = request.headers['accept-encoding'];
    if(!acceptEncoding){
        acceptEncoding = '';
    }
    if(acceptEncoding.match(/\bdeflate\b/)){
        response.writeHead(200, {'content-encoding':'deflate'});
        raw.pipe(zlib.createDeflate()).pipe(response);
    }else if(acceptEncoding.match(/\bgzip\b/)){
        response.writeHead(200, {'content-encoding':'gzip'});
        raw.pipe(zlib.createGzip()).pipe(response);
    }else{
        response.writeHead(200, {})
        raw.pipe(response);
    }
}).listen(1337);