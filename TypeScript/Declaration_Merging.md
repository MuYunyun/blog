### Merge Interface

```ts
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}
```

在 TypeScript 中，上述三个 Document 接口此时会发生合并，因此在实际使用中，也需要合并使用三个 Document 的参数与结果。

```ts
var obj: Document = {
  createElement: function (tagName: 'div' | 'span' | 'canvas') {
    return {} as any
  }
}
```

TypeScript 此时会根据传参自动帮助我们推导出结果的类型。

```ts
var result1 = obj.createElement('div')  // HTMLDivElement
var result2 = obj.createElement('span') // HTMLSpanElement
```

### link

- [x] [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)