## Types vs Interfaces

### 相同点

1. 两者都可用来表达 `Objects / Functions`, 不过它们语法不同。

Interface:

```ts
interface Point0 {
  x: number;
  y: number;
}

interface SetPoint0 {
  (x: number, y: number): void
}
```

Type:

```ts
type Point1 = {
  x: number;
  y: number;
}

type SetPoint1 = (x: number, b: number) => void
```

2. 两者都可以继承自 Interface 或者 Type。

继承自 Interface:

```ts
interface PartialPointX0 { x: number }
interface Point extends PartialPointX0 { y: number }

interface PartialPointX3 { x: number }
type PointX1 = PartialPointX3 & { y: number }
```

继承自 Type:

```ts
type PartialPointX1 = { x: number }
type PointX1 = PartialPointX1 & { y: number }

type PartialPointX2 = { x: number }
interface Point extends PartialPointX2 { y: number }
```

### 不同点

1. Type 可用来定义声明 `primitives`, `unions` 以及 `tuples` 类型。

```ts
// primitive
type Name = string;

// union
type Point = string | number

// tuple
type Data = [string, number]
```

2. Interface 可声明多次, 多次声明的类型会进行合并。Type 则只能声明一次。

```ts
interface Point { x: number }
interface Point { y: number }

const point: Point = { x: 1, y: 2 }
```

> [Types_vs_Interfaces](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220)