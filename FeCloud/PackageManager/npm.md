<!--
abbrlink: baced56a
-->

### npm

`npm` 经历了 3 次升级:

* `npm1`: 嵌套结构

缺点: 相同的包会被重复下载多次, 比如下列 a、b、c 都依赖了 xxx 这个包, xxx 这个包被下载了 3 次。

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

* `npm3`: 扁平结构

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

* `npm5`: 扁平结构 + package-lock.json

加上锁文件, 确保在不同电脑上安装的包的版本号相同。