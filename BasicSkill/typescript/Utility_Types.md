### Partial<T>

`Partial<T>`: 意味 T 集合的子集;

### Pick<T, K>

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

### Readonly<T>

`Readonly<T>`: T 中类型只读;

### Record<K, T>

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

### Omit<T,K>

在 T 类型中将属性符合 K 的字段移除。

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

### to read

`Exclude<T,U>`

### link

* [utility-types](https://www.elsewebdevelopment.com/wp-content/uploads/typescript-3.7-utility-types-printable-cheatsheet.pdf)
* [utility-types](https://www.elsewebdevelopment.com/typescript-3-7-utility-types-printable-pdf-cheat-sheet/?utm_source=typescript-weekly.com&utm_campaign=typescript_weekly_116&utm_medium=email)