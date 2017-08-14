
var http = require('http');
var options = {
    hostname: 'localhost',
    port: 1345,
    path:'/',
    method: 'post',
    body:JSON.stringify({name:'libin'})
}

var req = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        console.log('响应内容:' + chunk)
    })
})
req.write('您好');
req.end('再见');