## TypeScript 中使用函数

### Call Signatures

如果我们期望根据属性类型动态选取函数调用，可以书写如下:

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

在这里，`fn(6)` 中传入了数字 6，因而其命中了对象中 `(someArg: number): boolean;` 该条规则。

### 在函数中使用泛型应该注意的点

* 尽可能地直接使用参数类型，而不要去约束它。

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// ✅ a: number
const a = firstElement1([1, 2, 3]);
// ❎ b: any
const b = firstElement2([1, 2, 3]);
```

粗看 firstElement1 与 firstElement2 似乎达到一样的效果，但是结果上 a 的类型是 number，b 的类型是 any。这是因为 TypeScript 必须使用约束类型解析 arr[0] 表达式，而非在调用期间“等待”解析元素。

### 不要在 CallBacks 中使用可选参数表达式

若需要在回调函数中定义参数的类型，尽量不使用可选参数表达式，除非消费该函数时能保证处理好可选参数，这样子或多或少会增加代码的理解成本。

```ts
// 定义侧
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

// 消费侧
myForEach([1, 2, 3], (a, i) => {
  // ❎ Object is possibly 'undefined'.
  console.log(i.toFixed());
})
```

上述代码中，在定义侧对回调函数中的 index 参数作了可选表达式的声明，xxx

### link

[More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)