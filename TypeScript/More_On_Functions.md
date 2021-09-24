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

read: Constraints

We’ve written some generic functions

### link

[More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)