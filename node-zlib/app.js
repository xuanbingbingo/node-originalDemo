
var zlib = require('zlib');
//在zlib模块儿中，有以下几种方法用于创建对数据进行压缩及解压缩处理的对象

//用于进行压缩的对象有以下3种：

//zlib.createGzip([options])
//该方法用于创建并返回一个Gzip对象，该对象使用Gzip算法对数据进行压缩处理

//zlib.createDeflate([options])
//该方法用于创建并返回一个Deflate对象，该对象使用Deflate算法对数据进行压缩处理

//zlib.createDeflateRaw([options])
//该方法用于创建并返回一个DeflateRaw对象，该对象使用Deflate算法对数据进行压缩处理,在压缩数据中不添加zlib头

//用于进行解压的对象有以下4中：

//zlib.createGunzip([options])
//该方法用于创建并返回一个Gunzip对象，该对象对使用Gzip算法进行压缩的数据进行解压缩处理

//zlib.createInflate([options])
//该方法用于创建并返回一个Inflate对象，该对象对使用Deflate算法进行压缩的数据进行解压缩处理

//zlib.createInflateRaw([options])
//该方法用于创建并返回一个InflateRaw对象，该对象对使用DeflateRaw算法进行压缩的数据进行解压缩处理

//zlib.createUnzip([options])
//该方法用于创建并返回一个Unzip对象，该对象既可对使用Gzip算法进行压缩的数据进行解压缩处理，也可对使用Deflate算法进行压缩的数据进行解压缩处理.
//根据压缩数据中的zlib头来判断该数据是使用哪一种算法进行压缩的数据

//以上个方法所创建的对象，均为一个（既可用于读取流数据，又可用于写入流数据的）对象


//使用Gzip对象进行压缩文件
// var gzip = zlib.createGzip();
// var fs = require('fs');
// var inp = fs.createReadStream('test.txt');
// var out = fs.createWriteStream('test.txt.gz');
// inp.pipe(gzip).pipe(out);

//使用Gunzip对象解压缩文件
// var gunzip = zlib.createGunzip();
// var fs = require('fs');
// var inp = fs.createReadStream('test.txt.gz');
// var out = fs.createWriteStream('test.txt');
// inp.pipe(gunzip).pipe(out);


//接下来的例子请看server.js和client.js这两个文件（搭建的服务器和客户端）

