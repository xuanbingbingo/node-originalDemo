var crypto = require('crypto');
var fs = require('fs');
//crypto模块用于nodejs中的对OpenSSl类库的封装，实现加密与解密处理;

//crypto.getCiphers()返回nodejs可以使用的全部加密算法
// console.log(crypto.getCiphers().forEach(function(val){
//     console.log(val);
// }));

//crypto.getHashes()返回nodejs可以使用的全部散列算法



//以下是散列算法

//nodejs中想要使用散列（哈希）算法，首先需要使用createhash方法创建一个hash对象
//参数可以是 md5、sha1、sha256、sha512、ripemd160等，用于指定需要使用的散裂算法。该方法返回被创建的hash对象
//var hashObj = crypto.createHash(md5);

//在创建了hash对象之后，可以通过使用该对象的update方法创建一个摘要
//参数data为一个string或者buffer，input_encoding可以是uft8、ascii、binary, 如果不使用input_encoding,data必须是一个buffer
//可以在摘要被输出前使用多次update方法来添加摘要内容
//hashObj.update(data,[input_encoding]);

//可以使用hash对象的digest方法来输出摘要内容。
//在使用了digest方法后，不能再向hash对象中追加摘要内容。
//参数用于指定输出时的编码格式,可以是hex、binary、base64，不使用参数则返回buffer对象，否则返回string
//digest方法使用后，hashObj 这个对象不能再被使用
//hashObj.digest([encoding]);

//(1)、使用sha1算法为应用程序根目录下的test.js文件生成一个摘要，并且在控制台中输出该摘要的hex编码格式字符串
// var shasum = crypto.createHash('sha1');
// var s = fs.createReadStream('./test.js');
// s.on('data', function(d){
//     shasum.update(d);
// })
// s.on('end', function(){
//     var d = shasum.digest('hex');
//     console.log(d);
// })



//以下是HMAC算法

//HMAC算法将散裂算法与一个密钥结合在一起，以阻止对签名完整性的破坏
//nodejs中使用此算法
//第一个参数可以为 sha1、md5、sha256、sha512、ripemd160等，用于指定使用的散列算法
//第二个参数为一个字符串，用于指定一个PEM格式的密钥。在OpenSSL工具中，可以使用如下命令创建一个密钥:'opensslgenrsa -out key.pem 1024'
//var hmacObj = crypto.createHmac(algorithm,key);

//创建摘要
//hamcObj.update(data);

//输出摘要
//hamcObj.digest([encoding]);

//(2)、使用sha1算法以及应用程序根目录下的key.pem密钥文件为应用程序根目录下的test.js文件生成一个摘要，并输出
// var pem = fs.readFileSync('key.pem');//此文件是通过'opensslgenrsa -out key.pem 1024'生成的;
// var key = pem.toString('ascii');
// var shasum = crypto.createHash('sha1',key);
// var s = fs.createReadStream('./test.js');
// s.on('data', function(d){
//     shasum.update(d);
// })
// s.on('end', function(){
//     var d = shasum.digest('hex');
//     console.log(d);
// })




//以下是公钥加密

//Node.js提供了以下四个与公钥加密相关的类
//Cipher类：用于加密数据
//Decipher类：用于解密数据
//Sign类： 用于生成签名
//Verify类：用于验证签名

//在使用HAMC算法时，只需要使用一个私钥，但在使用公钥加密技术时，需要使用公钥及私钥
//其中私钥用于解密数据以及对数据进行签名，而公钥用于创建只有私钥的拥有者才能读出的加密数据，以及对私钥的拥有者的签名进行验证
//在OpenSSL工具中，可以使用‘openssl req -key key.pem -new -x509 -out cert.pem’来为一个私钥穿件一个PEM格式的公钥
//在Node.js中，要求公钥必须为一个证书文件，这意味着在创建公钥时需要提供一些附加信息


//加密数据（Cipher类）
//第一种方式创建cipher对象
//第一个参数用于指定加密数据时所使用的算法，可以是blowfish、aes-256-cbc等
//第二个参数用于指定加密时所使用的密码,该参数必须是一个二进制格式的字符串或者一个Buffer对象
// var cipherObj = crypto.createCipher(algorithm,password);

//第二种方式创建cipher对象，方法中第三个参数iv用于指定加密使用，该参数值必须是一个二进制格式的字符串或者一个Buffer对象
// var cipherObj = crypto.createCipheriv(algorithm,password,iv)

//在nodejs中，使用分块加密法进行加密。
//在创建了chipher对象后，可以通过该对象的update方法来指定需要被加密的数据。
//第一个参数data为一个Buffer对象或者字符串格式
//第二个参数用于指定被加密的数据所需使用的编码格式，可以是utf8、ascii、binary,如果不使用这个参数，则data必须是一个Buffer对象
//第三个参数用于指定输出加密数据时使用的编码格式，可指定参数值为hex、binary、base64,如果不使用这个参数，则方法返回一个存放了加密数据的Buffer对象，否则返回被编码的字符串
//updata方法返回被加密的数据（被分块儿的加密数据）。可以多次使用update来添加需要加密的数据
//cipherObj.update(data,[input_encoding],[output_encoding]);

//可以使用cipher对象的final方法来返回加密数据。此方法使用后，该对象不能再被使用
//参数可以是为hex、binary、base64；不使用这个参数，则方法返回一个Buffer对象，否则返回字符串格式的加密数据
//cipherObj.final([output_encoding])

//(3)、使用cipher对象加密‘test’字符串，加密算法为blowfish，密码从应用程序根目录下的key.pem私钥中读出
//在完成加密后，在控制台输出加密数据的hex编码格式的字符串
// var pem = fs.readFileSync('key.pem');
// var key = pem.toString('ascii');
// var cipherObj = crypto.createCipher('blowfish', key);
// var text = 'test';
// cipherObj.update(text,'binary','hex');
// var crypted = cipherObj.final('hex');
// console.log(crypted);
// console.log('加密完成');


//解密数据（Decipher类）
//两种方式创建decipher对象
//第一种方式创建decipher对象
//第一个参数用于指定解密数据时所使用的算法，可以是blowfish、aes-256-cbc等
//第二个参数用于指定解密时所使用的密码,该参数必须与加密该数据时所使用的密码保持一致
//var decipherObj = crypto.createDecipher(algorithm,password);

//第二种方式创建decipher对象
//第三个参数（iv）必须与加密该数据时所使用的初始向量保持一致
//var decipherObj = crypto.createCipheriv(algorithm,password,iv)

//（4)、对（3）中加密的数据进行解密(需要结合（3)中的代码一起来执行操作）
// var decipherObj = crypto.createDecipher('blowfish',key);
// var dec = decipherObj.update(crypted,'hex','utf8');
// dec += decipherObj.final('utf8');
// console.log(dec);
// console.log('解密完成');


//创建签名（Sign类）
//在网络中，私钥的拥有者可以在一段数据被发送之前先对该数据进行签名操作，在签名的过程中，将对这段数据执行加密处理
//在经过加密后的数据发送之后，数据的接受者可以通过公钥的使用来对该签名进行解密及验证操作

//在nodejs中，在进行签名之前，首先需要使用createSign创建一个sign对象
//参数用于指定在加密该数据时所使用的算法，如'RSA-SHA256'
//var signObj = crypto.createSign(algorithm)

//在创建了sign对象之后，可以通过使用该对象的update方法来指定需要被加密的数据
//参数data为一个Buffer对象或者一个字符串，用于制定需要被加密的数据。
//可以在对数据进行签名前使用多次update方法来添加数据
//signObj.update(data);

//可以使用sign对象的sign方法对数据进行签名。签名后不能再使用update方法追加数据，且该对象不能再被使用
//第一个参数private_key参数值为一个字符串，用于指定PEM格式的私钥。
//第二个参数output_format参数用于指定签名输出时所使用的编码格式，可指定为hex、binary、base64
//如果使用第二个参数，返回值是字符串格式的签名内容，否则返回一个Buffer对象
//signObj.sign(private_key,[output_format]);

//(5)、创建并使用sign对象对数据进行签名的示例：
//使用sign对象对'test'字符串进行签名，加密算法为RSA-SHA256,
//私钥从key.pem中读出，在数据签名完毕后，在控制台中输出数据签名的hex编码格式字符串
// var pem = fs.readFileSync('key.pem');
// var key = pem.toString('ascii');
// var signObj = crypto.createSign('RSA-SHA256');
// signObj.update('test');
// console.log(signObj.sign(key,'hex'));


//签名验证
//在对签名进行验证之前，首先需要创建一个verify对象，可以通过createVerify方法创建verify对象
//参数值必须与加密该数据时所使用的算法保持一致
//var verifyObj = crypto.createVerify(algorithm);

//通过使用update方法指定需要被验证的数据
//verifyObj.update(data);

//实用verify对象的verify方法对签名进行验证
//第一个参数object用于指定验证时所使用的对象，参数值是一个字符串，可以是一个RSA公钥、一个DSA公钥或者一个X.509证书。
//第二个参数signature参数值必须为sign对象，用于指定被验证的签名
//第三个参数用于指定在生成该签名时所使用的编码格式，如hex、binary、base64
//验证通过则返回为true，否则为false
//verifyObj.verify(object,signature,[signature_format])

//(6)、 私钥签名，公钥验证
// var privateKey = fs.readFileSync('key.pem');
// var publicKey = fs.readFileSync('cert.pem');
// var key = privateKey.toString();
// var pubkey = publicKey.toString();
// var data = 'test';
// var signObj = crypto.createSign('RSA-SHA256');
// signObj.update(data);
// var sig = signObj.sign(key,'hex');
// var verifyObj = crypto.createVerify('RSA-SHA256');
// verifyObj.update(data);
// console.log(verifyObj.verify(pubkey,sig,'hex'));























