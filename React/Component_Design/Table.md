### 边框的选择

border、box-shadow、伪元素都可以实现表格边框, 该如何选择?

* 角度一: 因为 border 属性天然可以拆分为 border-top、border-left、border-bottom、border-right。它们之间灵活组合性较高, 不会出现使用 box-shadow、伪元素带来相互影响的问题。