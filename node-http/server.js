var http = require('http');

var server = http.createServer(function(req,res){
    if(req.url !== '/favicon.ico'){
        //请求头常用字段
        // console.log(req.url,req.method,JSON.stringify(req.headers),req.httpVersion);

        //发送服务器端响应流 //res.writeHead(statusCode,[reasonPhrase],[headers]);
        //响应头包含一下常用字段
        // content-type: 用于指定响应的内容类型
        // location: 用于将客户端重定向到另一个url地址
        // content-disposition：用于指定一个被下载的文件名
        // content-length：用于指定服务器端相应内容的字节数
        // set-cookie：用于在客户端创建一个cookie 
        // response.setHeader("Set-Cookie",['type=ninja','language=javascript']);
        // content-encoding：用于指定服务器端相应内容的编码方式
        // Cache-Control：用于开启缓存机制
        // Expires：用于指定缓存过期时间
        // Etag：用于制定当服务器端响应内容没变化时不重新下载数据
        // Access-Control-Allow-Origin:指定允许向服务器请求数据的域名+端口号（省略端口时允许该域名下的任何端口向服务器请求数据）
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('<html><head><meta charset="utf-8"></head></html>');
        res.write('您好');
    }
    res.end();//必须有这个方法，否则相应头写的数据不会输出缓冲区，页面也就没有响应内容
}).listen(1337,'127.0.0.1');

server.on('listening',function(){
    console.log('服务器开始监听');
    // server.close()
})
server.on('close',function(){
    console.log('服务器已关闭')
})
server.on('error',function(e){
    if(e.code == 'EADDRINUSE'){
        console.log('服务器地址和端口被占用！')
    }
})
// server.on('connection',function(socket){
//     console.log('客户端连接已建立');
// })
// server.setTimeout(5000,function(){
//     console.log('服务器端超时')
// })

