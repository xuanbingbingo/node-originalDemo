//(1)HTTPS服务器使用HTTPS协议，而HTTP服务器使用HTTP协议
//(2)HTTPS服务器需要向证书受证中心（Certificate Authority）申请证书，一般免费证书少，需要交费。在少许对客户端有要求的情况下，也会要求客户端使用证书
//(3)HTTP服务器与客户端之间的传输是明文数据，而HTTPS服务器与客户端之间的传输是经过SSL安全加密后的密文数据。
//(4)HTTP服务器通过使用80端口或者8080端口，而HTTPS服务器使用的是443端口

//在创HTTPS服务器之前，服务器首先需要创建公钥、私钥及证书，步骤如下所示：
//(1)创建私钥。 可以使用openssl工具创建私钥，在openssl工具中使用的命令如下： openssl genrsa -out privatekey.pem 1024
//(2)创建证书签名请求(Certificate Signing Request)文件，在openssl工具中使用的命令如下所示： openssl req -new -key privatekey.pem -out certrequest.csr
//(3)获取证书。证书应该是一个经过证书授权中心签名的文件，该证书文件内容包含了服务器端提供的公钥以及证书的颁发机构等信息，可以使用openssl工具创建一个学习或测试用的证书，命令如下： openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
//在（3）命令中，x509参数表示该证书符合国际电信联盟制定的数字证书标准。在客户端与服务器建立连接以后，将首先确认证书的合法性。
//在具备了证书文件之后，可以使用该证书文件创建一个pfx文件。所谓pfx文件，是指该文件内容必须符合公钥加密技术12号标准（Public Key Cryptography Standards #12,PKCS#12）存储和传输用户或服务器私钥、公钥和证书而制定的格式
//在openssl工具中，可以使用如下所示的命令创建pfx文件 openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx
//在这些文件（其中pfx文件为可选用文件）具备了之后，可以使用https模块中的createServer方法创建一个HTTPS服务器，使用方法如下：https.createServer(options,[requestListener])

var https = require('https');
var fs = require('fs');
var pk = fs.readFileSync('./privatekey.pem');
var pc = fs.readFileSync('./certificate.pem');
var opts = {
    key: pk,
    cert: pc
};
var server = https.createServer(opts, function(req, res){
    console.log(req.url);
    if(req.url !== '/favicon.ico'){
        res.setHeader('Content-Type','text/html');
        res.write('<html><head><meta charset="utf-8"/></head>');
        res.write("你好");
        res.end();
    }
})
server.listen(443, 'localhost');
server.on('listening', function(){
    console.log('服务器开始监听')
})

