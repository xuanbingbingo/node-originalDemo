var assert = require('assert');
//nodejs中的断言处理模块儿assert

//assert.equal(actual, expected, [message]) 判断两个值是否相等（不对数据类型进行比较）
// assert.equal(2,1,'两个值不相等的错误信息出现了！');

//assert.strictEqual(actual, expected, [message]) 判断两个值和类型是否相等（要对数据类型进行比较）
// assert.strictEqual('1',1,'两个值不相等的错误信息出现了！');

//assert.deepEqual(actual, expected, [message]) 不仅可以比较基本类型，还可以比较对象类型，如数组，对象，缓存区的内容是否相等

//assert.throws（block,[error],[message]）方法,其中block是一个函数，若函数中有异常，则block为真，也就是不抛出AssertionError异常

//assert.doesNotThrow方法和throws方法正好在抛出异常的条件是相反的
