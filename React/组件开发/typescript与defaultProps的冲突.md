### 关于 Typescript 与 DefaultProps 的冲突

针对 `TypeScript` 中的 `interface` 中必填可填(是否带 ? 可选)与 React 中的 `defaultProps` 是不兼容的。造成的影响是 `defaultProps` 里若是不填写完整 `TypeScript` 中的 `interface` 属性则会标红。为了解决这个现象解决方案如下：

```ts
interface {
  mustFillIn: number,
  mayFillWithDefaultValue: number, // 可选的带默认值的不用带上问号
  mayFillWithoutDefaultValue?: number // 可选的不带默认值的带上问号
}
```

在 `TypeScript` 中书写 `React` 时可以这样:

```ts
class Divider extends React.Component<DividerProps, any> {

  static defaultProps: Pick<DividerProps, 'mayFillWithDefaultValue' | 'mayFillWithoutDefaultValue'> = {
    mayFillWithDefaultValue: 12345
  }

  render() {
    return (
      <div>demo</div>
    )
  }
}
```

* Pick 针对有必传值的场景做区分
* interface 中的 ? 针对有默认值和无默认值做区分

### 针对 hooks 中的写法

![](http://with.muyunyun.cn/764623d18eeb45724da661a0b6fbb679.jpg)
