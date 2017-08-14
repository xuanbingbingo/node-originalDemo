
var cluster = require('cluster');
var http = require('http');
//使用fork方法创建worker对象   cluster.fork([env]);//不指定env时子进程没有可以使用的环境变量，而不是使用process.env属性值中指定的环境变量
//使用多个子进程运行HTTP服务器，代码如下：
if(cluster.isMaster){
    cluster.fork();
    cluster.fork();
    console.log('主进程运行中。。。');
}else{
    http.createServer(function(req,res){
        if(req.url !== '/favicon.ico'){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<html><head><meta charset="utf-8"></head></html>');
            res.write('客户端请求在子进程'+cluster.worker.id+'中被处理');
            res.end();
            console.log('子进程'+cluster.worker.id+'处理中。。。');
        }
    }).listen(1340,'127.0.0.1');
}
cluster.on('fork', function(worker){
    console.log('子进程'+ worker.id + '被开启');
})
cluster.on('online', function(worker){
    console.log('接到子进程'+ worker.id + '的反馈信息');
})
cluster.on('listening',function(worker,address){
    console.log('子进程中的服务器'+worker.id+'开始监听，地址为：'+ address.address + ":" + address.port);
})


