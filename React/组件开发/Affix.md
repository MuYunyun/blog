### Affix 固钉组件

固钉组件实现的效果其实是 CSS 中的 `position: sticky` 属性, `position: sticky` 本质是 `position: relative` 与 `position: absolute` 的结合体。

开发坑点: 相对定位切换到绝对定位以后 `getBoundingClientRect().top` 获取的 top 是定值, 其值始终与 `offsetTop` 的值相等，这样无法从绝对定位切换到相对定位了。

解决手段: 提供一个占位父节点, 父节点使用 `getBoundingClientRect`, 子节点上绝对定位。[demo](https://github.com/ming-cult/snake-design/blob/master/components/Affix/index.tsx#L83-L87)