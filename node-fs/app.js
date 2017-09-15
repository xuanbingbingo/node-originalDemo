
var fs = require('fs');
var path = require('path');
var events = require('events');
var async = require('async');
// var event = new events.EventEmitter();

// event.on('test',function(data){
//     console.log(data);
// })
// event.emit('test','testData');

//同步／串行 读取数据
var data = fs.readFileSync('./index.html','utf8');
console.log(data);
console.log('-------------------------------------');
var data1 = fs.readFileSync('./index1.html','utf8');
console.log(data1);

//测试使用异步模块儿的不同方法的执行时间
// let a = (callback)=>{
//     fs.readFile('./index.html', 'utf8', function(err, data){
//         callback(null,data);
//     });
// }
// let b = (callback)=>{
//     fs.readFile('./index1.html', 'utf8', function(err, data){
//         callback(null,data);
//     });
// }
// console.time('先后执行总时间：');
// async.series([a,b],function(err,result){
//     console.log(result[0],result[1])
//     console.timeEnd('先后执行总时间：');
// });

// console.time('并行执行总时间：');
// async.parallel([a,b],function(err,result){
//     console.log(result[0],result[1])
//     console.timeEnd('并行执行总时间：');
// });


//异步读取数据
// fs.readFile('./index.html', 'utf8', function(err, data){
//     console.log(Buffer.isBuffer(data));//如果不加utf8这个编码格式的话，就会默认返回的data数据类型为Buffer类型
// });

//异步写入数据
// fs.writeFile('./message.txt','this is a test data',function(err){
//     if (err) console.log(err);
//     else console.log('数据写入成功');//默认写入方式为覆盖文件并写入数据，不是追加方式写入
// })

//异步写入Buffer类型的数据
// var data = new Buffer("测试数据");
// fs.writeFile('./message.txt', data, function(err){
//     if(err) console.log(err);
//     else console.log('数据写入成功');
// })

//测试异步写入追加数据
// var options = {
//     flag:'a'
// };
// fs.writeFile('./message.txt', data, options, function(err){
//     if(err) console.log(err);
//     else console.log('数据追加写入成功');
// })

//使用readFile、writeFile方法复制图片格式的文件
// fs.readFile('images/timg.jpeg','base64',function(err,data){
//     console.log(Buffer.isBuffer(data));
//     fs.writeFile('images/timg1.jpeg',data.toString(),'base64',function(err){
//         if(err) console.log('写文件操作失败');
//         else console.log('写文件成功');
//     })
// })

//使用appednFile追加数据到一个文件的尾部
// fs.appendFile('message.txt','\n这绝对是追加的数据','utf8',function(err){
//     if(err) console.log('追加文件数据失败');
//     else console.log('追加文件操作成功');
// })

//使用open方式从指定位置开始读写文件 fs.open(filename, flags, [mode], callback)               callback为 function(err, fd){}
//fs.read(fd,buffer,offset,length,position,callback); callback 为 function(err, bytesRead, buffer)
//offset参数用于指定向缓存区中写入数据时的开始写入位置（以字节为单位）
//length参数用于指定从文件中读取的字节数
//position参数用于指定读取文件时的开始位置（以字节为单位）
// fs.open('message.txt','r',function(err,fd){
//     var buf = new Buffer(255);
//     fs.read(fd,buf,0,9,3,function(err, bytesRead, buffer){
//         console.log(buf.length);
//         console.log(buffer.slice(0,bytesRead).toString());
//     })
// })

//从文件当前读取位置继续往下读(接上个例子)
// fs.open('message.txt','r',function(err,fd){
//     var buf = new Buffer(255);
//     fs.read(fd,buf,0,9,3,function(err, bytesRead, buffer){
//         console.log(buffer.slice(0,bytesRead).toString());
//         fs.read(fd,buf,0,3,null,function(err, bytesRead, buffer){
//         console.log(buffer.slice(0,bytesRead).toString());
//     })
//     })
// })

//使用open方式从指定位置开始读写文件 fs.open(filename, flags, [mode], callback)               callback为 function(err, fd){}
//flags为'w'指的是覆盖写入,flags为'a'指的是追加写入
//fs.write(fd,buffer,offset,length,position,callback); callback 为 function(err, written, buffer)
//offset参数用于指定从缓存区中读取数据时的开始读取位置（以字节为单位）
//length参数用于指定从缓存区中读取的字节数
//position参数用于指定写入文件时的开始位置（以字节为单位）
//一次性写入举例
// fs.open('message.txt','w',function(err,fd){
//     fs.fstat(fd,function(err,stats){
//         console.log(stats);
//     })//此处是打开文件后查询当前文件的属性信息的操作，使用了fs.fstat(fd, callback)的方式
//     var buf = new Buffer('我喜爱编程');
//     fs.write(fd,buf,3,9,0,function(err,written,buffer){
//         if(err) console.log('文件写入失败');
//         console.log('文件写入成功');
//         fs.fsync(fd);
//         fs.close(fd);
//     })
// })

//追加写入举例,也称为连续写入(接上个例子)
// fs.open('message.txt','a',function(err,fd){
//     var buf = new Buffer('我喜爱编程');
//     fs.write(fd,buf,3,9,0,function(err,written,buffer){
//         if(err) console.log('文件写入失败');
//         console.log('文件写入成功');
//         fs.write(fd,buf,12,3,null,function(err,written,buffer){
//             console.log('文件写入成功');
//         })
//     })
// })

//创建目录
// fs.mkdir('./testDir',0777,function(err){
//     if(err) console.log(err);
//     else console.log("文件夹创建成功")
// })

//读取目录下的所有文件
// fs.readdir('./testDir',function(err,files){
//     if(err) console.log(err);
//     else console.log(files);
// })

//查看文件或目录的信息 fs.stat || fs.lstat
// fs.lstat('./testDir/index.html',function(err,stats){
//     if(err) console.log(err);
//     else {
//         console.log(stats.isFile());
//         console.log(stats.isDirectory());
//         console.log(stats.isBlockDevice());
//         console.log(stats.isCharacterDevice());
//         console.log(stats);
//     }
// })

//检查文件或目录是否存在
// fs.exists('./testDir/index.js',function(exists){
//     if (exists){
//         console.log('文件存在');
//     }else{
//         console.log('文件不存在');
//     }
// })

//获取文件或目录的绝对路径
// fs.realpath('./testDir/index.js',function(err,resolvedPath){
//     if(err) console.log(err);
//     else console.log(resolvedPath);
// })

//使用ReadStream对象直接读取文件
// var file = fs.createReadStream('message.txt');
// file.on('open',function(fd){
//     console.log('开始读取文件')
// })
// file.on('data',function(data){
//     console.log('读取到数据;');
//     console.log(data.toString());
//     console.log(data);
//     console.log(Buffer.isBuffer(data));//读取到的是Buffer对象
// })
// file.on('end',function(){
//     console.log('文件已全部读取完毕')
// })
// file.on('close',function(){
//     console.log('文件被关闭')
// })
// file.on('error',function(err){
//     if(err) console.log('文件读取失败')
// })

//使用ReadStream对象在打开文件后暂停文件的读取，隔一秒钟后开始读取文件并在控制台中输出文件内容;
// var readStream = fs.createReadStream('message.txt');
// readStream.pause();
// readStream.on('data',function(data){
//     console.log('获取到的数据为:' + data);
// })
// setTimeout(function(){
//     readStream.resume();
// },3000)

//使用WriteStream对象写入文件
// var outStream = fs.createWriteStream('out.txt');
// var readStream = fs.createReadStream('message.txt');
// readStream.on('data',function(data){
//     outStream.write(data);
// })
// outStream.on('open',function(fd){
//     console.log('需要写入的文件已被打开')
// })
// readStream.on('end',function(){
//     outStream.end('再见',function(){//通过end事件向文件的结尾处添加数据‘再见’
//         console.log('文件全部写入完毕');
//         console.log('已写入d%字节的数据',outStream.bytesWritten);
//     })
// })

//使用WriteStream对象写入文件,写入的同时打印已写入的数据
// var outStream = fs.createWriteStream('out.txt');
// var readStream = fs.createReadStream('message.txt');
// readStream.on('data',function(data){
//     outStream.write(data,function(){
//         console.log(data.toString());
//     });
// })

//使用pipe进行文件的复制操作
// var readStream = fs.createReadStream('message.txt');
// var outStream = fs.createWriteStream('heheda.txt');
// readStream.pipe(outStream,{end:false});
// readStream.on('end',function(){
//     outStream.end('再见',function(){
//         console.log('文件全部写入完毕');
//     })
// })

//使用path模块儿对路径进行解析操作
// var myPath = path.normalize('./testDir//a//b//c'); //path.normalize();
// console.log(myPath);
// var myPath = path.join(__dirname,'testDir','a','b','c'); //path.join();
// console.log(myPath);
// var myPath = path.resolve('testDir','a','b','c'); //path.resolve();
// console.log(myPath);
// var myPath1 = path.join(__dirname,'testDir','index.html'); //path.relative();
// var myPath2 = path.join(__dirname,'testDir','a','b','c');
// console.log(path.relative(myPath1,myPath2));
// var myPath = path.dirname(__dirname+'/testDir/index.html');//path.dirname()
// console.log(myPath);
// var myPath = path.basename(__dirname+'/testDir/index.html'); //path.basename();
// console.log(myPath);
// var myPath = path.extname(__dirname+'/testDir/index.html'); //path.extname();
// console.log(myPath);
// console.log(path.sep,path.delimiter); //当前操作系统下的文件分割符和路径分割符
