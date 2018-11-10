本篇文章整理和 HTML5 相关的点

### DOM 相关

1. getElementsByClassName;
2. 遍历相关，见如下;

如果只涉及元素节点的操作(不涉及其它节点)，可以用如下左侧的属性替代右侧的属性：

| 属性名 | 被替代的属性 |
| :-: | :-: |
| children | childNodes |
| childElementCount | childNodes.length |
| previousElementSibling | previousSibling |
| nextElementSibling | nextSibling |
| firstElementChild | firstChild |
| lastElementChild | lastChild |

3. ele.scrollIntoView()

默认为 true，ele 移到屏幕中央; 若为 false, ele 移到屏幕底部;
