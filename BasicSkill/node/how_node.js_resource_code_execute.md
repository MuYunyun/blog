### 笔记系列 —— Node.js 源码是如何执行的

### 如何调试 node 源码 （IDE 选择和断点调试）

1. clone 源码到本地

2. c/c++ 3 步编译安装法, [参考](https://my.oschina.net/surjur/blog/349464)

```c
./configure --debug   // 会生成 node/out/Debug 文件
make -j4              // -j4 为启用 4 个作业
make install
```

3. 根目录下创建测试文件 test.js

```js
const fs = require('fs')

fs.readFile('./node.gyp', {encoding: 'utf-8'}, function (e, content) {
  console.log(content)
})
```

4. IDE 使用 clion, 配置 Run -> Edit Configureations, 配置内容如下:

* 选择 out/Debug/node 作为执行文件
* 添加 test.js 作为命令行参数, 也可以添加 node 的其他参数, 比如 --expose-gc
* Before launch 栏中 build 去掉

![](http://with.muyunyun.cn/747aa17d5be5e261b7a580c10880365f.jpg-400)

5. 点击 OK 按钮即完成配置, 在 src/node_file.cc 的 1592 行 static void Read(const FunctionCallbackInfo<Value>& args) 增加断点, 此时 Run -> Debug 'node' 即可进入调试界面

### 编译步骤

