var fs = require('fs');
var http = require('http');
var domain = require('domain');
//try catch只能捕获同步操作中的错误
// try {
//     var data = fs.readFileSync('./text.txt');
//     console.log(data);
// } catch (error) {
//     console.log('读取文件发生错误');
// }

//使用uncaughtException事件来捕获任何未被处理的错误(这是一种粗鲁的行为，不能给客户端反馈，不建议使用，但是可以避免服务器强制退出，保证了服务器不刮掉)
// http.createServer(function(req,res){
//     if(req.url !== '/favicon.ico'){
//         nonexist();
//         res.writeHead(200, {'Content-Type':'text/html'});
//         res.write('<html><head><meta charset="utf-8"></head></html>');
//         res.write('您好');
//         res.end();
//     }
// }).listen(1338,'127.0.0.1');
// process.on('uncaughtException', function(err){
//     console.log('接收客户端请求时发生一下错误：');
//     console.log(err);
// })

//使用domain模块捕获异步操作中的错误（这才是捕获错误正确的做法）
// http.createServer(function(req,res){
//     var d = domain.create();
//     d.once('error',function(err){//捕获到错误后进行一些列处理，方便客户端知道服务器发生了错误，给予了客户端较好的反馈,同时捕获到的错误也不会使服务器down掉
//         res.writeHead(200, {'Content-Type':'text/html'});
//         res.write('<html><head><meta charset="utf-8"></head></html>');
//         res.write('服务器端接收客户端请求时发生以下错误：');
//         res.write(err.message);
//         res.end();
//     });
//     d.run(function(){
//         if(req.url !== '/favicon.ico'){
//             nonexist();
//             res.writeHead(200, {'Content-Type':'text/html'});
//             res.write('<html><head><meta charset="utf-8"></head></html>');
//             res.write('您好');
//             res.end();
//         }
//     })
// }).listen(1338,'127.0.0.1');

//domain模块详解
// var dom= domain.create();//创建一个Domain对象，该对象同时继承了EventEmitter
http.createServer(function(req,res){
    var reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', function(err){
        res.writeHead(200);
        res.write('服务器端接收客户端请求时发生以下错误：'+err.message);
        res.end();
    })
    res.writeHead(200);
    req.on('data',function(){
        res.write('您好');
        res.end();
    })
}).listen(1345);

