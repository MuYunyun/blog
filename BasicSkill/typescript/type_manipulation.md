本文档为 TypeScript 的[类型系统](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)阅读笔记。

### Keyof

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // string | number
```

这里需要留意 M 的类型是 `string | number`, 这是因为 JavaScript 对象中总是将 key 对待为一个 string 类型, 比如 obj[0] 与 obj['0'] 是等价的。

### Typeof

需要注意「类型空间」与实际值的区别。

以 ReturnType<T> 为例:

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
```

直接操作值, 会报错 `'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?`。因此我们得使用 typeof 来将函数转化为类型空间。

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

### Indexed Access

可以结合使用 typeof 与 number 去获取数组元素的类型。

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
]

// type Person = {
//   name: string;
//   age: number;
// }
type Person = typeof MyArray[number];
```
