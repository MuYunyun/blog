<!--
abbrlink: 9oeefka1
-->

- [基础语法](#基础语法)
  - [常量、变量](#常量变量)
  - [数据类型](#数据类型)
  - [函数](#函数)
  - [控制流](#控制流)
- [所有权](#所有权)
  - [所有权规则](#所有权规则)
  - [变量与数据的交互方式](#变量与数据的交互方式)
  - [引用](#引用)
  - [切片](#切片)
- [结构体](#结构体)
  - [结构体类型](#结构体类型)
  - [结构体使用案例](#结构体使用案例)
  - [方法](#方法)
- [枚举](#枚举)
  - [定义枚举](#定义枚举)
  - [定义方法](#定义方法)
  - [常见的枚举类型：Option](#常见的枚举类型option)
  - [控制流运算符 match](#控制流运算符-match)
  - [简单控制流 if let](#简单控制流-if-let)
  - [模式](#模式)
- [模块系统](#模块系统)
  - [路径](#路径)
- [通用集合类型](#通用集合类型)
- [错误处理](#错误处理)
- [trait 定义共享行为](#trait-定义共享行为)
- [生命周期及其标注语法](#生命周期及其标注语法)
  - [Rust 内置三条计算生命周期规则](#rust-内置三条计算生命周期规则)
- [智能指针](#智能指针)
- [并发](#并发)
- [Rust 开发中一些约定俗成原则](#rust-开发中一些约定俗成原则)
- [释义](#释义)

### 基础语法

#### 常量、变量

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

#### 数据类型

数据类型
* `标量类型（scalar）`
  * 整数
    * 默认推导类型是 i32；
    * arch 的位数取决与系统架构，32 为系统为 32 位，64 位系统为 64 位；

> i 表示 signed，u 表示 unsigned。

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
* `复合类型（compound）`
  * 元组（tuple）
    * 可以将不同类型的多个值组合进一个复合类型中；
    * 无法在声明结束后增加/减少其中的元素数量；

```rust
let tup = (500, 6.4, 1);
// 支持解构
let (x, y, z) = tup;
```

  * 数组（array）
    * 动态数组（vector）
    * 静态数组

#### 函数

* 使用 -> 来使用函数返回值

```rust
fn main() {
    let x = plus_one(5);
    println!("The value of x is: {}", x);
}

fn plus_one(x: i32) -> i32 {
    // 以下语句不加分号作为表达式表示函数执行返回的值。
    x + 1
}
```

#### 控制流

1. 在 Rust 中，if、loop 均为表达式。因此可以将表达式返回的值作为结果赋值给变量，比如：

```Rust
fn main() {
    let condition = false;
    // 执行代码，此处 x 被赋值为 6。
    let x = if condition {
        5
    } else {
        6
    };
    println!("The value of x is: {}", x);
}
```

2. Rust 中支持 loop、while、for 循环语法。
   a. Rust 中，一般推荐使用 for 来实现循环，不推荐使用 while 来实现循环，原因是 while 表达式中的条件比较容易产生越界行为。

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a.iter() {
        println!("the value is {}", element);
    }
}
```

### 所有权

1. 什么是借用，解决什么场景？
2. 什么是切片？
3. Rust 在内存中布局方式是怎么样的？
4. 所有权的工作原理是？

> ①. 借用、切片是两种不持有所有权的数据类型。
> ②. 所有权、借用、切片的概念是 Rust 可以在编译时保障内存安全的关键所在。

#### 所有权规则

1. Rust 中的每一个值都有一个对应的变量作为它的所有者。
2. 在同一个时间内，有且仅有一个所有者。
3. 当所有者离开自己的作用域时，它持有的值会被释放掉。

#### 变量与数据的交互方式

```rust
fn main() {
    let s1 = "hello";
    // 合法
    let s2 = s1;

    println!("s1 = {}, s2 = {}", s1, s2);
}
```

1. 移动

```rust
fn main() {
    let s1 = String::from("hello");
    // 使用了 String::from("") 分配了堆内存，
    // 为避免多次释放内存的问题，Rust 采取了移动的设计方案，此时 s1 变量对应的堆内存被移动到了 s2 变量中。
    let s2 = s1;

    // 非法
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

2. 克隆

```rust
fn main() {
    let s1 = String::from("hello");
    // 使用了 String::from("") 分配了堆内存，
    // 使用 clone 方法，s2 指向了复制后的堆内存，同时 s1 变量对应的堆内存得以保留。
    let s2 = s1.clone();

    // 合法
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

#### 引用

参数传递给函数也会触发移动或者复制。

```rust
fn main() {
    let s1 = String::from("hello");
    // ① s1 变量对应的堆内存所有权移动至 take 函数中
    take(s1);
    // ③ s1 变量不再含有有效引用，此处编译报错
    println!("s1 is {}", s1);
}

fn take(s: String) {
    println!("s is {}", s);
// ② 随着 take 函数执行完后，s 变量对应的堆内存被释放。
}
```

想要上述案例在 ③ 处访问 s1 仍然可以生效，可作如下修改：

```rust
fn main() {
    let s1 = String::from("hello");
    let s1 = take_and_gives_back(s1);
    println!("s1 is {}", s1);
}

fn take_and_gives_back(s: String) -> String {
    s
}
```

但是如需返回其它参数，每次都要返回所有权，就不是很便利了

```rust
fn main() {
    let s1 = String::from("hello");
    let (s1, len) = take_and_gives_back(s1);
    println!("s1 is {}, len is {}", s1, len);
}

fn take_and_gives_back(s: String) -> (String, usize) {
    let length = s.len();
    // 此处返回 s 变量，以归还所有权
    (s, length)
}
```

因此 Rust 提供了借用的能力。

* `借用（borrowing）`

```rust
fn main() {
    let s1 = String::from("hello");
    let len = take_and_gives_back(&s1);
    println!("s1 is {}, len is {}", s1, len);
}

fn take_and_gives_back(s: &String) -> usize {
    let length = s.len();

    length
}
```

* 可变引用

```rust
fn main() {
    let mut s1 = String::from("hello");
    change(&mut s1);
}

fn change(s: &mut String) {
    s.push_str(", world.");
    println!("s1 is {}", s);
}
```

* 悬垂引用（Dangling References）
  * 这是写 Rust 代码时容易碰到的错误，表示指针指向的原有内存地址对应的内存空间已经被释放或者已经另作它用。

```rust
fn main() {
    let reference_to_nothing = dangle();
    println!("reference_to_nothing is {}", reference_to_nothing);
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}
```

#### 切片

切片允许我们引用集合中某一段连续的元素序列，而不是整个集合。

```rust
fn main() {
    let mut word = String::from("Hello World");
    let first_world_result = first_world(&word);
    word.clear();

    // 背景一：在调用 word.clear() 后，first_world_result 的结果仍然会是 5，
    // 但从语义上调用 word.clear() 后得到的第一个单词的长度应该是要发生变化的，
    // 有没有办法保证 first_world_result 结果的实时性？
    println!("The first word is {}", first_world_result);
}

// 该函数的作用是返回第一个单词的长度。
fn first_world(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }

    s.len()
}
```

基于背景一，使用切片进行优化。

```rust
fn main() {
    let mut word = String::from("Hello World");
    let first_world_result = first_world(&word);
    // ❎ 标注二：调用 clear() 表示变量 word 引用可变，与标注一矛盾，因而此处 Rust 编译无法通过。
    word.clear();
    println!("The first word is {}", first_world_result);
}

fn first_world(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            // 标注一：
            // ① 切片表示引用不可变。
            // ② 字符串字面量也是切片。
            return &s[..i];
        }
    }

    // 同标注一
    &s[..]
}
```

### 结构体

在 Rust 中，结构体 **struct** 是一种自定义数据类型（对应 JavaScript 中的 Class）。

1. 元组与结构体之间的异同是，为什么要区分元组与结构体？
2. 如何定义方法和关联函数？

#### 结构体类型

* 结构体

```rust
struct MoveMessage {
    x: i32,
    y: i32,
}
```

* 元祖结构体

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

* 空结构体

#### 结构体使用案例

调试代码时，通常需要打印值来助于调试，如何打印结构体呢？

```Rust
// ① 添加注解来派生 Debug trait
#[derive(Debug)]
struct User {
    age: u32,
}

fn main() {
    let user1 = User {
        age: 10
    };

    // ② 在花括号 { } 中加入 :? 来告知 println! 当前的结构体需要使用名为 Debug 的格式化输出。
    println!("demo is {:?}", user1);
}
```

如何从现有实例中复用部分相同的字段。使用双点号 **..** 可以复用已有的实例值。

```Rust
#[derive(Debug)]
struct User {
    age: u32,
    level: u32
}

fn main() {
    let user1 = User {
        age: 10,
        level: 2
    };

    let user2 = User {
        age: 11,
        ..user1
    };

    // demo is User { age: 11, level: 2 }
    println!("demo is {:?}", user2);
}
```

#### 方法

方法可以给结构体指定行为。

```Rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rectl = Rectangle { width: 30, height: 30 };
    println!("rectl is {:?}", rectl.area());
}
```

### 枚举

* 常见的枚举类型：Option
* 控制流运算符：match
* 简单控制流：if let

> **枚举**与**结构体**是创建自定义类型的两种方法。

#### 定义枚举

```rust
#[derive(Debug)]
// 定义枚举
enum IpAddr {
    // ① 使用枚举代替结构体优势一：每个枚举变体可以拥有不同类型和数量的关系关系。
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    // ② 使用枚举代替结构体优势二：枚举允许直接将其关联的数据嵌入枚举变体内。
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    println!("home is {:?}", home);
    println!("loopback is {:?}", loopback);
}
```

#### 定义方法

枚举与结构体一样，可以使用 impl 来定义方法

```rust
#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

// 枚举与结构体一样，可以使用 impl 来定义方法。
impl IpAddr {
    fn print(&self) {
        // 此处 &self 打印的是 ②、③ 进行赋予的值。
        println!("&self is {:?}", &self);
    }
}

fn main() {
    // ②
    let home = IpAddr::V4(127, 0, 0, 1);
    // ③
    let loopback = IpAddr::V6(String::from("::1"));

    home.print();
    loopback.print();
}
```

#### 常见的枚举类型：Option

Rust 语言中没有空值，但是有一个类似空值概念的枚举，可以用其来标识值的缺失。它在 Rust 标准库中定义如下：

```rust
enum Option<T> {
    Some(T),
    None,
}
```

```rust
fn main() {
    // Some 表示确定值是存在的；
    let some_number = Some(5);
    let some_string = Some("a string");

    // None 值表示不存在一个有效的值；
    let absent_number: Option<i32> = None;
}
```

Rust 通过枚举 `Option<T>` 的设计，可以避免「假设某个值存在，实际却为空」的问题。

#### 控制流运算符 match

枚举类型 Option 与控制流运算符 match 常常会保持连用。

```rust
fn main() {
    let five = Some(5);
    // 命中 Some 模式，返回结果为 6 的 Some 值。
    let six = plus_one(five);
    // 命中 None 模式。
    let none = plus_one(None);
}

fn plus_one(x: Option<i3  2>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
```

#### 简单控制流 if let

1. if let 是控制流运算符 match 的语法糖，适合处理只关心某一处匹配而忽略其它匹配的情况。

```rust
if let PATS = EXPR {
    /* body */
} else {
    /*else */
}
```

等同于

```rust
match EXPR {
    PATS => { /* body */ },
    _ => { /* else */ },    // () if there is no else
}
```

2. if 与 if let 可以混合使用。

#### 模式

1. 模式分为不可失败（irrefutable）和可失败（refutable）两种类型。不可失败模式能够匹配任何传入的值，可失败模式则可能因为某些特定的值而匹配失败。
   1. 函数参数、let 语句以及 for 循环只接收不可失败模式。
   2. if let 和 while let 表达式则只接收可失败模式。

### 模块系统

1. 包（package）与单元包（crate）的区别是？
2. 什么是路径（path）？

#### 路径

路径有两种形式：`绝对路径`与`相对路径`。

>《Rust 权威指南》第 158 页：Rust 开发者会倾向使用绝对路径，原因是往往会彼此独立地移动代码的定义与调用代码。

1. 使用单元包名或字面量 crate 从根节点开始的绝对路径；
2. 使用 super 关键字或内部标识符从当前模块开始的相对路径；
   a. super 相当于文件系统的 ..；

### 通用集合类型

* 动态数组 `Vec<T>`

```rust
fn main() {
    let v = Vec::new();
    // Rust 提供了 vec! 宏，根据提供的值来创建一个新的动态数组。
    let v1 = vec![1, 2, 3];
}
```

1. 动态数组允许在单个数据结构中存储多个相同类型的值。
2. 如需在动态数组中存储不同类型的值。
   a. 如果类型可以穷举，使用枚举来存储。

```rust
fn main() {
    enum Demo {
        Int(i32),
        Float(f64),
    }

    let case = vec![
        Demo::Int(3),
        Demo::Float(10.12),
    ];
}
```

   b. 【Todo】如果类型不可穷举，使用动态 trait 来存储。

* 字符串
  * 复杂性在于
    * Rust 倾向暴露可能的错误。
    * 字符串是一个超乎许多编程者想象的复杂数据结构。（展开的话涉及到字节、标量值、字形簇）
  * 字节内容无法通过单个数字索引来获取，需要`在索引的 [] 中填写范围`。

```rust
fn main() {
    let hello = "Hello";
    let result = &hello[0..1];
    // 输出 result 的结果为 H，因此类似 JavaScript 中的 slice 语法取值遵循「左闭右开」原则。
    println!("The result is {}", result);
}
```

  * 复杂字符串拼接场景，建议使用 `format!` 宏。优点是可以避免字符在合并过程中所有权的失效。

```rust
fn main() {
    let hello = "Hello";
    let world = "World";

    let hello_world = format!("{}-{}", hello, world);
    println!("The result is {}", hello_world);
}
```

* 哈希映射

### 错误处理

1. panic! 宏表示程序正处于一个无法处理的状态下，此时需要终止进程运行。

### trait 定义共享行为

trait 与其它语言中的接口（interface）概念功能类似，但也不尽相同。

Todo：补充相关实践。

### 生命周期及其标注语法

```rust
&i32          // 引用
&'a i32       // 拥有显示生命周期的引用
&'a mut i32   // 拥有显示生命周期的可变引用
```

1. rust 中生命周期标注语法的作用是？

在 Rust 中，生命周期指的是变量在内存中存在的时间范围。

在以下场景下，需要明确指定这个引用变量的生命周期以避免使用无效、或超出其有效期的引用，提高了程序的可靠性。

a. 函数中使用引用

```rust
// 场景：函数中使用引用。
// 此处我们告诉 Rust，longest 函数返回的生命周期与传入参数中较短的生命周期相同。
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

b. 结构体中的引用字段

```rust
// 场景：结构体中的引用字段
// 此处我们告诉 Rust，Foo 实例的存活时间不能超过存储在 x 字段中的引用的存活时间。
struct Foo<'a> {
    x: &'a i32,
}
```

c. 方法定义

结构体字段中的生命周期名字总是需要被声明在 impl 关键字之后。

```rust
impl<'a> Foo<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

#### Rust 内置三条计算生命周期规则

1. 规则一：每一个引用参数都会拥有自己的生命周期参数。
2. 规则二：当只存在一个输入生命周期参数时，这个生命周期会被赋予给所有输出生命周期参数。
3. 规则三：当拥有多个输入生命周期参数，而其中一个是 &self 或 &mut self 时，self 的生命周期会被赋予给所有的输出生命周期参数。

进而回过头去看[切片](#切片)章节中函数 `first_world` 的例子，根据规则一、规则二，因而未显示标注生命周期，也可编译通过。

### 智能指针

智能指针（smart pointer）是一类数据结构。它们的行为类似于指针但拥有额外的元数据和附加功能。Rust 标准库中不同的智能指针提供了比引用更为强大的功能。

Rust 标准库中常见的智能指针比如有：

1. `Box<T>`：可用于在堆上分配值；

```rust
// 实现一个简版 Box<T>
use std::ops::Deref;

fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    // 此处 *y 会被 Rust 隐式地展开为：*(y.deref())
    assert_eq!(5, *y);
}

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    // 通过 Deref trait 将智能指针视作常规引用。
    fn deref(&self) -> &T {
        &self.0
    }
}
```

2. `Rc<T>`: 可用于单个值被多个所有者持有的场景；
   1. Rc 表示 ‘Reference Counted’；
   2. (Todo，后续补充)用于单线程场景；

3. `RefCell<T>`: 通过内部可变性模式使我们可以修改一个不可变类型的内部值；它会在运行时而不是编译时承担起维护借用规则的责任。

### 并发

1. 创建新线程；

1.1. 使用 spawn 创建新线程；

```rust
use std::thread;
use std::time::Duration;

// hi number 1 from the main thread!
// hi number 1 from the spawned thread!
// hi number 2 from the main thread!
// hi number 2 from the spawned thread!
// hi number 3 from the main thread!
// hi number 3 from the spawned thread!
// hi number 4 from the main thread!
// hi number 4 from the spawned thread!
fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

1.2. 使用 join 句柄等待所有线程结束；

由于主线程停止，1.1 中案例在大部分情形下都会提前终止新线程，无法保证新线程一定会得到执行。

thread::spawn 的返回值类型是一个自持有所有权的 JoinHandle，调用它的 join 方法可以阻塞当前线程直达对应的新线程运行结束。从而保证新线程能在 main 函数退出前执行完毕。

```diff
fn main() {
+    let handle = thread::spawn(|| {
-    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

+    handle.join().unwrap();

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

2. 使用通道在线程间发送消息的传递式并发；
   1. 关键字：`channel`
3. 允许多个线程访问同一片数据的共享状态式并发；

### Rust 开发中一些约定俗成原则

1. 将程序拆分为 main.rs 和 lib.rs，main.rs 负责运行程序，lib.rs 处理实际的逻辑。

### 释义

1. Rust 模块上经常看到诸如 #[cfg(test)] 的写法以对模块进行标注，那么 cfg 表示什么？

在 Rust 中，cfg 表示 "configure"（配置）的缩写。cfg 是 Rust 内部用于条件编译的关键字，可以使得代码在不同的平台或者构建环境下执行不同的代码。
