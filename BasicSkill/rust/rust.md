<!--
abbrlink: k1q2fiqi
-->

- [带着问题去阅读](#带着问题去阅读)
- [安装](#安装)
- [Cargo](#cargo)
- [笔记](#笔记)
- [语言比较](#语言比较)
- [相关仓库\\网站](#相关仓库网站)
- [参考资料](#参考资料)

### 带着问题去阅读

Rust 几个高频词汇

1. 什么是所有权？



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

### 笔记

常量
* 使用 const；
* 需要显示标注值类型，比如 `const MAX_POINTS: u32 = 100_000`；
* 无法将函数或需要依赖运行时动态计算的值赋给常量；

隐藏 vs 变量
* 两者的差别在于：使用隐藏的方式可以将类型进行重置，而变量的方式不可以；

```rust
// 使用「隐藏」方式
fn main() {
    let spaces = "   ";
    let spaces = spaces.len();
}

// 使用「变量」方式（如下写法编译器会抛错）
fn main() {
    let mut spaces = "   ";
    spaces = spaces.len();
}
```

数据类型
* 标量类型（scalar）
  * 整数
    * 默认推导类型是 i32；
    * arch 的位数取决与系统架构，32 为系统为 32 位，64 位系统为 64 位；

|  长度  | 有符号 | 无符号 |
| :----: | :----: | :----: |
| 8-bit  |   i8   |   u8   |
| 16-bit |  i16   |  u16   |
| 32-bit |  i32   |  u32   |
| 64-bit |  i64   |  u64   |
|  arch  | isize  | usize  |

  * 浮点数
    * 可以定义为 f64、f32，默认推导类型是 f64；
  * 布尔值
    * 类型声明是 bool；
  * 字符
    * 类型声明是 char；
    * 需要使用单引号；
* 复合类型（compound）
*

### 语言比较

1. Rust 程序需要进行预编译生成一份可执行的二进制文件。JavaScript/Python 不需要。

### 相关仓库\网站

* [rustfmt](https://github.com/rust-lang/rustfmt): Format Rust code
* [wasm-pack](https://rustwasm.github.io/wasm-pack/): 使用其可以快速实现 Rust -> wasm -> npm 包的编译打包。
* [rust-analyzer](https://github.com/rust-lang/rust-analyzer): 编辑器加强与 Rust 相关的能力。
* [crates.io](https://crates.io/) Rust 开源 Rust 项目网站（类似 JavaScript 的 npm 社区）。

### 参考资料

* [前端视角解读 Why Rust](https://mp.weixin.qq.com/s/ePddAbrIIsSepCadH_ZTPw)
* [实现一个简单的基于 WebAssembly 的图片处理应用](https://juejin.cn/post/6844904205417709581)
