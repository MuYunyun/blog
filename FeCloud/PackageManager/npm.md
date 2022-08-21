<!--
abbrlink: baced56a
-->

- [npm 发展](#npm-发展)
  - [npm1: 所有包都采用嵌套结构](#npm1-所有包都采用嵌套结构)
  - [npm3: 引入扁平结构](#npm3-引入扁平结构)
  - [npm5: 扁平结构基础上引入 package-lock.json](#npm5-扁平结构基础上引入-package-lockjson)

### npm 发展

`npm` 对于 node_modules 的处理，经历了如下 3 次升级：

#### npm1: 所有包都采用嵌套结构

相同的包会被重复下载多次, 比如下列 a、b、c 都依赖了 xxx 这个包, xxx 这个包被下载了 3 次，造成了不必要的冗余问题。

```text
-node-modules
  - a
    - node-modules
      - xxx @1.0.0
  - b
    - node-modules
      - xxx @1.0.0
  - c
    - node-modules
      - xxx @1.0.1
```

#### npm3: 引入扁平结构

所依赖的包的依赖也安装于根目录, 如果所依赖的包的依赖在根目录已存在但是版本不一致, 则在所依赖的包下面单独加上依赖的包。例子如下:

```
-node-modules
- a
- b
- xxx @1.0.0
- c
  - node-modules
    - xxx @1.0.1
```

使用扁平结构一定程度上解决了 npm1 的冗余问题，但是 npm 中还存在一些问题没法解决。

`幻影依赖问题`。npm3 不会以确定的方式安装依赖项。举例来说：我们在 NodeJS 中 require() 的函数，不需要考虑配置文件 package.json 中是否有该依赖项。这可能会导致依赖版本不兼容，并且开发者不容易发现; 另外，由于`Nodejs`的依赖解析规则[8]，这还会导致幻影 node_modules ，即依赖向上查找，可能会越过代码目录自身的 node_modules。

`npm 分身问题`。简单来讲，npm 分身是指同一个依赖的不同版本会出现在 node_modules 中，比如项目中同时依赖了 A@1.0.0 和 A@2.0.0，无论是扁平化处理A@1.0.0 或 A@2.0.0，另一个依赖还是会被重复，如果这样的分身较多，就会导致一些潜在问题，比如扩展包大小变大、相关类型校验交叉等。

#### npm5: 扁平结构基础上引入 package-lock.json

加上锁文件, 确保在不同电脑上安装的包的版本号相同。
