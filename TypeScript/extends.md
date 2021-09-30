## 精读 extends

## 用于条件判断时的 extends

当 extends 用于表示条件判断时，可以总结出以下规律

1. 同一类型的子类型在使用 extends 时，extends 语义可解释为等于。

```ts
type result1 = 'a' extends 'abc' ? true : false // false
type result2 = 123 extends 1 ? true : false // false
```

2. `狭窄类型 extends 宽泛类型`且`宽泛类型中包含狭窄类型`时结果为 true，反之为 false。

```ts
type result3 = string extends string | number ? true : false // true
```

3. 当 extends 作用于对象时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄，可以参考如下例子。

```ts
type result4 = { a: true, b: false } extends { a: true } ? true : false // true
```

## 泛型类型中的 extends

考虑如下 Demo 类型定义:

```ts
type Demo<T, U> = T extends U ? never : T
```

因为 `'a' | 'b' | 'c' extends 'a'` 是 false, 所以 `Demo<'a' | 'b' | 'c', 'a'>` 结果是 `'a' | 'b' | 'c'` 么?

查阅[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)，其中有提到:

> When conditional types act on a generic type, they become distributive when given a union type.

即当条件类型作用于泛型类型时，它们在给定联合类型时成为分配类型。用 JavaScript 来表达 `'a' | 'b' | 'c' extends 'a'` 的结果类似于:

```js
function Demo(T, U) {
  return T.map(val => {
    if (val !== U) return val
    return 'never'
  })
}

Demo(['a', 'b', 'c'], 'a') // ['never', 'b', 'c']
```

此外根据 [never 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)的定义 —— never 类型可分配给每种类型，但是没有类型可以分配给 never（除了 never 本身）。即 `never | 'b' | 'c'` 等价于 `'b' | 'c'`。

因此 `Demo<'a' | 'b' | 'c', 'a'>` 结果并不是 `'a' | 'b' | 'c'` 而是 `'b' | 'c'`。而 Demo 类型的声明其实就是 TS 官方提供的 `Exclude<Type, ExcludedUnion>`。

### 逃离舱

如果想让 `Demo<'a' | 'b' | 'c', 'a'>` 的结果为 `'a' | 'b' | 'c'` 是否可以实现呢? 根据[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)描述:

> Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of the extends keyword with square brackets.

如果不想遍历泛型中的每一个类型，可以用方括号将 extends 关键字的每一侧括起来。

```ts
type Demo<T, U> = [T] extends [U] ? never : T

// result 此时类型为 'a' | 'b' | 'c'
type result = Demo<'a' | 'b' | 'c', 'a'>
```

## 在箭头函数中使用 extends

在箭头函数中使用三元表达式时，从左向右的阅读习惯导致函数内容区若不加括号则会让使用方感到困惑。比如下方代码中 x 是函数类型还是布尔类型呢？

```js
// The intent is not clear.
var x = a => 1 ? true : false;
```

在 eslint 规则 [no-confusing-arrow](https://eslint.org/docs/rules/no-confusing-arrow) 中，推荐如下写法：

```js
var x = a => (1 ? true : false);
```

在 TypeScript 的类型定义中若在箭头函数中使用 extends 也是同理，一眼看如下代码也是比较绕，

Todo: 换一个 Demo

```ts
type CurryV0<P extends any[], R> =
  (arg0: Head<P>) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R
```

因此在箭头函数中使用 extends 建议加上括号，对 code review 很有帮助。

```ts
type CurryV0<P extends any[], R> =
  (arg0: Head<P>) => (HasTail<P> extends true ? CurryV0<Tail<P>, R> : R)
```

## 结合类型推导使用 extends

TypeScript 中有一个语法 [infer]()，使用它可以实现推导类型的目的。一般会结合 extends 来使用 infer。比如：

todo:

### 使用 extends 来判断两个类型完全相等

```ts
// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650. understanding it is difficult.
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<U>() => U extends Y ? 1 : 2) ? true : false
```