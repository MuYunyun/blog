### Affix 固定组件

开发坑点: 相对定位切换到绝对定位以后 `getBoundingClientRect().top` 获取的 top 是定值, 其值始终与 `offsetTop` 的值相等，这样无法从绝对定位切换到相对定位了。

解决手段: 在父节点使用 getBoundingClientRect, 子节点上绝对定位。