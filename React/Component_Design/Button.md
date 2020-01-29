### Button 组件

#### 样式自定义覆盖

```js
getClassName = () => {
  const { className, type } = this.props
  const classStr = ClassNames('mobile-btn', className, {
    ['mobile-btn-primary']: type === 'primary',
  })
  return classStr
}
```

```scss
.mobile-btn {
  ...
  &-primary {
    background: $btn-background;
  }
}
```

这里有个样式优先级的知识点, 如果想让传进来的自定义样式 `className` 中的 background 覆盖掉 `mobile-btn-promary` 的 `background`, 需做如下改动:

```scss
.mobile-btn {
  ...
}

&.mobile-btn-primary {
  background: $btn-background;
}
```

### 难点

在移动端中, 手指移到 button 按钮上时如何模拟 pc 端的 hover 状态?