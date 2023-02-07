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

1. 什么是借用？
2. 什么是切片？
3. Rust 在内存中布局方式是怎么样的？
4. 所有权的工作原理是？

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
