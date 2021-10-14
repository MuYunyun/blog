<!--
abbrlink: fvrpelzp
-->

### `Partial<T>`

`Partial<T>`: 意味 T 集合的子集;

### `Pick<T, K>`

`Pick<T, K>`: 相对 `Partial<T>`, `Pick<T, K>` 限制了子集中必须含有 K 定义的类型字段。

```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

### `Readonly<T>`

`Readonly<T>`: T 中类型只读;

### `Record<K, T>`

`Record<K, T>`: 建立 K 到 T 之间的 map 映射。

```js
interface PageInfo {
  title: string;
}
type Page = "home" | "about" | "contact";
const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};
```

### `Omit<T, K>`

`Omit<T, K>`: 申明一个类型其在 T 类型中`移除 K 中包含的属性值`;

```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

### `Exclude<T, U>`

* `Exclude<T, U>`: 申明一个类型其在 T 类型中`移除 U 中所包含的类型`;
* 版本: 2.8

```js
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### `Extract<T, U>`

* `Extract<T, U>` — Extract from T those types that are assignable to U.
* 版本: 2.8

### `NonNullable<T>`

* `NonNullable<T>`: 申明一个类型其将 T 类型中的 null 与 undefined 移除;
* 版本: 2.8

### `ReturnType<T>`

* `ReturnType<T>` — Obtain the return type of a function type.
* 版本: 2.8

### `InstanceType<T>`

* `InstanceType<T>`: 申明一个由构造函数实例类型组合而成的类型;
* 版本: 2.8

```js
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof C>; // C
type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // any
type T3 = InstanceType<string>; // Error
type T4 = InstanceType<Function>; // Error
```

### Link

- [x] [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)