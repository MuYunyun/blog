### lerna

### background

~~需求背景: 需要在 `pc` 端容器里嵌套一个 `mobile` 容器，相当于要同时启动两个项目。~~

~~将其定位为一个 `monorepos` 项目。~~

From lerna

> Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.

### 方案一: lerna

```
$ mkdir lerna-repo && cd $_
$ npx lerna init
```

* lerna init: 初始化当前项目
* lerna run: 跑各个子包里的 `script`
* lerna bootstrap: Bootstrap the packages in the current Lerna repo. Installs all of their dependencies and links any cross-dependencies.

> details see [lerna doc](https://lerna.js.org/)


* [Mono repo 迁移实践](https://medium.com/@banyudu/mono-repo-%E8%BF%81%E7%A7%BB%E5%AE%9E%E8%B7%B5-eaf955aaf4d7)
* [awesome-monorepo](https://github.com/korfuri/awesome-monorepo)

### 相关资料

* [lerna github](https://github.com/lerna)
* [alist](https://github.com/alibaba/alist)


