需求背景: 需要在 `pc` 端容器里嵌套一个 `mobile` 容器，相当于要同时启动两个项目。

将其定位为一个 `monorepo` 项目。

### 方案一: lerna

```
$ mkdir lerna-repo && cd $_
$ npx lerna init
```

* lerna init: 初始化当前项目
* lerna run: 跑各个子包里的 `script`

### 相关资料

> [lerna github](https://github.com/lerna)



