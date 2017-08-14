var fs = require('fs');
var child_process = require('child_process');

//process.stdin对象与process.stdout对象的使用示例
// process.stdin.resume();
// process.stdin.on('data',function(chunk){
//     process.stdout.write('进程接收到数据：' + chunk);
// })

//遍历process.argv属性值数组
// process.argv.forEach(function(val,index,array){
//     console.log(index + ":" + val);
// })

//process.memoryUsage用于获取运行Node.js应用程序的进程的内存使用量

//process.nextTick指定一个函数在一个同步方法执行完毕或者异步方法的回调函数开始执行时调用
// var fs = require('fs');
// var finish = function(){
//     console.log('文件读取完毕');
// }
// process.nextTick(finish);
// console.log(fs.readFileSync('./test.txt').toString());

// var fs = require('fs');//process.nextTick在一个异步方法的回调函数开始执行时调用
// var foo = function(){
//     function test(){
//         console.log('aaa');
//     }
//     process.nextTick(test);
// }
// var file1 = fs.createReadStream('./test.txt');
// file1.on('data',function(chunk){
//     console.log('到%d个字节', chunk.length);
// })
// foo();

//process.cwd()获取当前目录,process.chdir()修改目录
// console.log(`当前目录为：${process.cwd()}`);
// process.chdir('../');
// console.log(`上级目录为：${process.cwd()}`);

//process.exit()退出运行NODE.js的应用进程；

//process.uptime()返回Node.js应用程序的当前运行时间，单位为秒,无参数

//process.hrtime()测试一段代码的运行时间
// var time = process.hrtime();
// var data = fs.readFileSync('./test.txt');
// var diff = process.hrtime(time);
// console.log(`读文件操作耗费%d纳秒`, diff[0] * 1e9 + diff[1]);

//Node.js中的进程可能触发的事件如下所示：
//(1)exit事件
//(2)uncaughtException事件 ／／比如调用一个未定义的函数就会出发这个事件
//(3)各种信号事件如'SIGINT'等




//创建多进程应用程序 child_process模块儿

//使用spawn方法开启一个用于运行某个命令的子进程 child_process.spawn(comman,[args],[options])
//使用fork方法开启子进程 child_process.fork(modulePath,[args],[options]);

//fork Demo1
// var firstChild = child_process.fork(__dirname + '/test.js');
// firstChild.on('message', function(m){//监听子进程的信息
//     console.log('父进程接收到信息:', m);
//     process.exit();
// });
// firstChild.send({userName:'libin'})//向子进程发送数据

//fork Demo2 //silent:true表示子进程对象使用独立的标准输入输出
// var sp1 = child_process.fork('./test/test1.js',['one','two','three','four'],{silent:true});
// var sp2 = child_process.fork('./test2.js');
// sp1.stdout.on('data',function(data){
//     console.log('子进程标准输出：'+ data);
//     sp2.send(data.toString());
// })
// sp1.on('exit',function(code,signal){
//     console.log('子进程退出，退出码为：'+ code);
//     process.exit();
// })
// sp1.on('error',function(err){
//     console.log('子进程开启失败:' + err);
//     process.exit();
// })









