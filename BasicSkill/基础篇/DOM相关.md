### 样式相关

1. elt.style

* 优点: 能使用 api 或者直接改写 style 内的样式
* 缺点: 只能针对内嵌样式

2. window.getComputedStyle(elt[, pseudoElt])

* 优点: 支持内联样式\外联样式
* 缺点: 只能进行只读操作, 不支持 IE