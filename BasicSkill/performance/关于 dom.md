### DOM 相关优化

如果只涉及元素节点的操作(不涉及其它节点)，可以用如下左侧的属性替代右侧的属性：

| 属性名 | 被替代的属性 |
| :-: | :-: |
| children | childNodes |
| childElementCount | childNodes.length |
| previousElementSibling | previousSibling |
| nextElementSibling | nextSibling |
| firstElementChild | firstChild |
| lastElementChild | lastChild |