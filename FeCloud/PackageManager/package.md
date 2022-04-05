<!--
abbrlink: iwwepxpg
-->

- [包下载的前置知识](#包下载的前置知识)
- [区分几个 package.json 字段](#区分几个-packagejson-字段)
- [resolutions in package.json](#resolutions-in-packagejson)

### 包下载的前置知识

一个包的版本号基本由三位数字构成 `x.x.x`, 它们分别是 `Major`(主版本号), `Minor`(次版本号), `Patch`(修订号)。

* `*`: 升级 `Major` + `Minor` + `Patch`;
* `^`: 升级 `Minor` + `Patch`;
* `~`: 升级 `Patch`;

比如 `^4.3.1 表示 4.x.x` 的最新版, `~4.3.1 表示 4.3.x` 的最新版。

### 区分几个 package.json 字段

* dependencies: 业务依赖
* devDependencies: 开发依赖
* peerDependencies:
  * a 依赖了 b 包, b 包的 peerDependencies 字段含有 c 包。
    * b 包执行 yarn 此时并不会安装上 c 包。
    * 如果 a 包中未执行安装 c 包, 则会报错。

### resolutions in package.json

背景: 在项目中的 package.json 字段里 dependencies 字段有较新版本的 beast-mobile(带主题包), resolutions 指向了较低版本的 beast-mobile(不带主题包)。此时验证项目中包含主题包。

查找 yarn 的 [rfc](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-selective-versions-resolutions.md#package-designation), resolutions 指定的目录只针对「嵌套」依赖的包版本生效。
