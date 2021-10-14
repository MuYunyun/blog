<!--
abbrlink: a3a3qa6u
-->

## 数据类型

在 TypeScript 进行类型定义的时候尽量不使用 Object、Boolean、Array、Function 等大写开头的标识来定义类型，因为它们在 JavaScript 中都是具体的函数对象，取而代之地应该使用 object、boolean、[]、() => void。

### 字符串类型

一个保存字符串的文本，类型声明为 string。

```ts
let name: string = 'muyy'
```

### 布尔值类型

boolean 是 true 或 false 的值，所以 `let isBool3: boolean = new Boolean(1)` 就会编译报错，因为 new Boolean(1) 生成的是一个 Bool 对象。

```ts
let isBool1: boolean = false
```

### 数字类型

```ts
let number: number = 10;
```

### 数组类型

数组是 Array 类型。然而，因为数组是一个集合，我们还需要指定在数组中的元素的类型。我们通过 `Array<type>` or `type[]` 语法为数组内的元素指定类型。

```ts
let arr: number[] = [1, 2, 3, 4, 5]
let arr2: Array<number> = [1, 2, 3, 4, 5]

let arr3: string[] = ["1","2"]
let arr4: Array<string> = ["1","2"]
```

### Tuple 类型

Tuple 类型相对于 Array 类型, 其允许元素的类型不一定相同。

```js
let x: [string, number]
x = ['a', 1]
```

### enums 类型

列出所有可用值，一个枚举的默认初始值是 0。一开始的范围可以作如下调整:

```ts
enum Role {Employee = 3, Manager, Admin}
let role: Role = Role.Employee
console.log(role) // 3
console.log(Role[4]) // Manager
```

### any 类型

any 是默认的类型，其类型的变量允许任何类型的值：

```ts
let notSure:any = 10
let notSure2:any[] = [1,"2",false]
```

### void 类型

JavaScript 没有空值 void 的概念，在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数：

```ts
function alertName(): void {
  console.log('My name is muyy')
}
```

此外，需注意的是如果在函数声明的变量后方声明 () => void，函数中是可以返回任意值，只不过结果类型仍然为 void。

```ts
✅
const f1: () => void = function() {
  return true
}

❎
const f3 = function(): void {
  return true
}
```

### unknow 类型

任何使用 any 类型的地方推荐使用 unknow 类型代替它。

> [new-unknown-top-type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type), 比 any 更加安全的类型

如果没有断言或缩小到更具体的类型，则不允许对 unknow 类型做任何操作。比如下方例子:

```ts
function f(x: unknown) {
  x == 5;
  x !== 10;
  x >= 0; // Error
  x + 1; // Error
  x * 2; // Error
  -x; // Error
  +x; // Error
  x.foo; // Error
  x[5]; // Error
  x(); // Error
}
```

### never 类型

当函数 throw 或者返回错误, 循环永远为 true 时可以声明为 [never 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)。

```js
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message)
}

// Inferred return type is never
function fail() {
  return error("Something failed")
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) { ... }
}
```