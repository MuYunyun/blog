<!--
abbrlink: d1jkxo7l
-->

# TypeScript 条件类型精读与实践

在大多数程序中，我们必须根据输入做出决策。TypeScript 也不例外，使用条件类型可以描述输入类型与输出类型之间的关系。

## 用于条件判断时的 extends

当 extends 用于表示条件判断时，可以总结出以下规律

1. 若位于 extends 两侧的类型相同，则 extends 在语义上可理解为 `===`，可以参考如下例子:

```ts
type result1 = 'a' extends 'abc' ? true : false // false
type result2 = 123 extends 1 ? true : false     // false
```

2. 若位于 extends 右侧的类型包含位于 extends 左侧的类型(即狭窄类型 extends 宽泛类型)时，结果为 true，反之为 false。可以参考如下例子:

```ts
type result3 = string extends string | number ? true : false // true
```

3. 当 extends 作用于对象时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄。可以参考如下例子:

```ts
type result4 = { a: true, b: false } extends { a: true } ? true : false // true
```

## 在泛型类型中使用条件类型

考虑如下 Demo 类型定义:

```ts
type Demo<T, U> = T extends U ? never : T
```

结合[用于条件判断时的 extends](#用于条件判断时的-extends)，可知 `'a' | 'b' | 'c' extends 'a'` 是 false, 因此 `Demo<'a' | 'b' | 'c', 'a'>` 结果是 `'a' | 'b' | 'c'` 么?

查阅[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)，其中有提到:

> When conditional types act on a generic type, they become distributive when given a union type.

即当条件类型作用于泛型类型时，联合类型会被拆分使用。即 `Demo<'a' | 'b' | 'c', 'a'>` 会被拆分为 `'a' extends 'a'`、`'b' extends 'a'`、`'c' extends 'a'`。用伪代码表示类似于:

```js
function Demo(T, U) {
  return T.map(val => {
    if (val !== U) return val
    return 'never'
  })
}

Demo(['a', 'b', 'c'], 'a') // ['never', 'b', 'c']
```

此外根据 [never 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)的定义 —— never 类型可分配给每种类型，但是没有类型可以分配给 never(除了 never 本身)。即 `never | 'b' | 'c'` 等价于 `'b' | 'c'`。

因此 `Demo<'a' | 'b' | 'c', 'a'>` 的结果并不是 `'a' | 'b' | 'c'` 而是 `'b' | 'c'`。

### 工具类型

心细的读者可能已经发现了 Demo 类型的声明过程其实就是 TypeScript 官方提供的工具类型中 [`Exclude<Type, ExcludedUnion>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion) 的实现原理，其用于将联合类型 ExcludedUnion 排除在 Type 类型之外。

```ts
type T = Demo<'a' | 'b' | 'c', 'a'> // T: 'b' | 'c'
```

基于 Demo 类型定义，进一步地还可以实现官方工具类型中的 [`Omit<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)，其用于移除对象 Type
中满足 keys 类型的属性值。

```ts
type Omit<Type, Keys> = {
  [P in Demo<keyof Type, Keys>]: Type<P>
}

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type T = Omit<Todo, 'description'> // T: { title: string; completed: boolean }
```

### 逃离舱

如果想让 `Demo<'a' | 'b' | 'c', 'a'>` 的结果为 `'a' | 'b' | 'c'` 是否可以实现呢? 根据[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)描述:

> Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of the extends keyword with square brackets.

如果不想遍历泛型中的每一个类型，可以用方括号将泛型给括起来以表示使用该泛型的整体部分。

```ts
type Demo<T, U> = [T] extends [U] ? never : T

// result 此时类型为 'a' | 'b' | 'c'
type result = Demo<'a' | 'b' | 'c', 'a'>
```

## 在箭头函数中使用条件类型

在箭头函数中使用三元表达式时，从左向右的阅读习惯导致函数内容区若不加括号则会让使用方感到困惑。比如下方代码中 x 是函数类型还是布尔类型呢？

```js
// The intent is not clear.
var x = a => 1 ? true : false
```

在 eslint 规则 [no-confusing-arrow](https://eslint.org/docs/rules/no-confusing-arrow) 中，推荐如下写法：

```js
var x = a => (1 ? true : false)
```

在 TypeScript 的类型定义中，若在箭头函数中使用 extends 也是同理，由于从左向右的阅读习惯，也会导致阅读者对类型代码的执行顺序感到困惑。

```ts
type Curry<P extends any[], R> =
  (arg: Head<P>) => HasTail<P> extends true ? Curry<Tail<P>, R> : R
```

因此在箭头函数中使用 extends 建议加上括号，对于进行 code review 有很大的帮助。

```ts
type Curry<P extends any[], R> =
  (arg: Head<P>) => (HasTail<P> extends true ? Curry<Tail<P>, R> : R)
```

## 结合类型推导使用条件类型

在 TypeScript 中，一般会结合 extends 来使用类型推导 [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) 语法。使用它可以实现自动推导类型的目的。比如用其来实现工具类型 [`ReturnType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)，该工具类型用于返回函数 Type 的返回类型。

```ts
type ReturnType<T extends Function> = T extends (...args: any) => infer U ? U : never

MyReturnType<() => string>          // string
MyReturnType<() => Promise<boolean> // Promise<boolean>
```

结合 extends 与类型推导还可以实现与数组相关的 `Pop<T>`、`Shift<T>`、`Reverse<T>` 工具类型。

**`Pop<T>`**:

```ts
type Pop<T extends any[]> = T extends [...infer ExceptLast, any] ? ExceptLast : never

type T = Pop<[3, 2, 1]> // T: [3, 2]
```

**`Shift<T>`**:

```ts
type Shift<T extends any[]> = T extends [infer _, ...infer O] ? O : never

type T = Shift<[3, 2, 1]> // T: [2, 1]
```

**`Reverse<T>`**

```ts
type Reverse<T> = T extends [infer F, ...infer Others]
  ? [...Reverse<Others>, F]
  : []

type T = Reverse<['a', 'b']> // T: ['b', 'a']
```

## 使用条件类型来判断两个类型完全相等

我们也可以使用条件类型来判断 A、B 两个类型是否完全相等。当前社区上主要有两种方案:

**方案一**: 参考 [issue](https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-420227672)。

```ts
export type Equal1<T, S> =
  [T] extends [S] ? (
    [S] extends [T] ? true : false
  ) : false
```

目前该方案的唯一缺点是会将 any 类型与其它任何类型判为相等。

```ts
type T = Equal1<{x:any}, {x:number}> // T: true
```

**方案二**: 参考 [issue](https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650)。

```ts
export type Equal2<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<U>() => U extends Y ? 1 : 2) ? true : false
```

目前该方案的唯一缺点是在对交叉类型的处理上有一点瑕疵。

```ts
type T = Equal2<{x:1} & {y:2}, {x:1, y:2}> // false
```

以上两种判断类型相等的方法见仁见智，笔者在此抛砖引玉。
