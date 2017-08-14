
console.log('bbb');
process.on('message', function(m){
    console.log('子进程接收到信息:', m);
    process.send({age:40});
})