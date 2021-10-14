<!--
abbrlink: 2um498vn
-->

### Roadmap

* [roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap)
* [overview](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)

### 1.3

* [Tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-3.html#tuple-types)

### 1.4

enum

### 2.8

* [Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)

### 3.2

todo: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html

### 3.7

#### Optional Chaining Operator(可选链操作符)

Optional Chaining Operator can help us `reduce some code` when we judge `foo.bar.baz` as follow:

```js
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}

// After
if (foo?.bar?.baz) {
  // ...
}
```

`?:`: check in `undefined` and `null`.

```js
undefined ?: 1 // undefined
null ?: 1      // undefined
0 ?: 1         // 1
'' ?: 1        // 1
NaN ?: 1       // 1
```

> `&&` has different behaviour. Not only `undefined` and `null`, but `falsy value` will be also checked. eg:

```js
undefined && 1 // undefined
null && 1      // null
0 && 1         // 0
'' && 1        // ''
NaN && 1       // NaN
```

#### Nullish Coalescing Operator(空值合并操作符)

`??` means you can take the value that isn't `undefined` or `null`.

```js
undefined ?? 1 // 1
null ?? 1      // 1
0 ?? 1         // 0
'' ?? 1        // ''
```

You can use it when using `0` as true such as:

```js
if (typeof value !== 'number') return
// before
let valueStash = value === 0 || value ? value : defaultValue

// after
let valueStash = value ?? defaultValue
```

> `||` has different behaviour. Not only `undefined` and `null`, but `falsy value` will be also checked. eg:

```js
undefined || 1 // 1
null || 1      // 1
0 || 1         // 1
'' || 1        // 1
```