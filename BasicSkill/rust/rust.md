<!--
abbrlink: k1q2fiqi
-->

- [带着问题去阅读](#带着问题去阅读)
- [安装](#安装)
- [Cargo](#cargo)
- [语言比较](#语言比较)
- [相关仓库\\网站](#相关仓库网站)
- [参考资料](#参考资料)

### 带着问题去阅读

Rust 几个高频词汇

1. 什么是所有权？

所有权是 Rust 语言特别提供来解决使用/管理堆、栈内存的方案。

2. 什么是代数数据类型？
3. 什么是宏，什么是卫生宏？
4. 什么是 trait(特征)?
5. 什么是隐藏机制？
6. 什么是结构体？

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

### Cargo

Cargo 是 Rust 项目中的构建系统与包依赖管理工具。

```
// 创建一个新 Rust 项目
cargo new xx

// 检查是否可以编译通过
cargo check

// 编译项目，构建产物位于 target/debug 目录下
cargo build
// release 模式用更长的编译时间，以优化运行时的性能。构建产物位于 target/release 目录下
cargo build --release

// 编译并运行项目
cargo run
// 运行 target/release 下的二进制文件
cargo run --release

// 打开文档，查看依赖包文档(经验证，执行以下命令，暂未看到依赖包相关信息，如果后续验证结果有变，再进行修改)
cargo doc --open
```

### 语言比较

1. Rust 程序需要进行预编译生成一份可执行的二进制文件。JavaScript/Python 不需要。
2. Rust 区分语句与表达式。
  a. 语句：Rust 中无返回结果。
  b. 表达式：Rust 中有返回结果。

```rust
// Rust 中，let y = 6 无返回结果，因此将其赋值给左侧变量 x 会抛错。
let x = (let y = 6);
```

### 相关仓库\网站

* [rustfmt](https://github.com/rust-lang/rustfmt): Format Rust code
* [wasm-pack](https://rustwasm.github.io/wasm-pack/): 使用其可以快速实现 Rust -> wasm -> npm 包的编译打包。
* [rust-analyzer](https://github.com/rust-lang/rust-analyzer): 编辑器加强与 Rust 相关的能力。
* [crates.io](https://crates.io/) Rust 开源 Rust 项目网站（类似 JavaScript 的 npm 社区）。

### 参考资料

* [前端视角解读 Why Rust](https://mp.weixin.qq.com/s/ePddAbrIIsSepCadH_ZTPw)
* [实现一个简单的基于 WebAssembly 的图片处理应用](https://juejin.cn/post/6844904205417709581)
