<!--
abbrlink: k1q2fiqi
-->

- [带着问题去阅读](#带着问题去阅读)
- [安装](#安装)
- [相关仓库](#相关仓库)
- [参考资料](#参考资料)

### 带着问题去阅读

Rust 几个高频词汇

1. 什么是所有权？
2. 什么是代数数据类型？
3. 什么是卫生宏？

### 安装

> https://www.rust-lang.org/tools/install

rustup: Rust 命令行工具，用于下载安装 Rust，还用来管理不同的 Rust 发行版本。

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

安装完 rustup 后，可以执行以下命令

```
// 检查 Rust 是否已经安装
rustc --version

// 更新 Rust 版本
rustup update

// 卸载 rustup 及 Rust 工具链
rustup self uninstall

// 生成一份可以在网页中进行访问的离线的 Rust 文档
rustup doc
```

### 相关仓库

[wasm-pack](https://rustwasm.github.io/wasm-pack/): 使用其可以快速实现 Rust -> wasm -> npm 包的编译打包。

### 参考资料

* [前端视角解读 Why Rust](https://mp.weixin.qq.com/s/ePddAbrIIsSepCadH_ZTPw)
* [实现一个简单的基于 WebAssembly 的图片处理应用](https://juejin.cn/post/6844904205417709581)
