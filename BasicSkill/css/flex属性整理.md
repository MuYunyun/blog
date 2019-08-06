### flex 属性记录

```css
.demo {
  flex: 1 1 100px;
}
```

三个值分别为

* `flex-grow`: 占比, 默认为 0;
* `flex-shrink`: 缩减比例, 0 为不缩减, 默认为 1;
* `flex-basis`: flex 基本尺寸, 默认为 auto;

### flex 的特殊用法

#### flex + z-index

* 我们知道 `z-index` 要与定位元素(absolute、relative、absolute、sticky)一起使用, 但使用了 flex 布局后, 尽管仍然是 `position: static`, z-index 仍然是生效的。

#### flex + margin

见 [水平垂直居中](./水平垂直居中.md)