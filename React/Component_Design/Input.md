<!--
abbrlink: np9vhb7s
-->

### Input 组件

### input type 为 bankCard 或 phone 时, 光标错位问题

![](http://with.muyunyun.cn/5d99b6bb211806c1e3a19361125e06e8.jpg)

* 遇到问题: 在光标位置输入 5, 光标位置出现错误

在光标位置输入 5, 光标此时的 selectionStart/selectionEnd 变为 5, 可推测规律当判断 4 的位置为 ' ' 时, 应该让 selectionStart = selectionEnd = 光标位置 + 1

![](http://with.muyunyun.cn/55efc4cc4dd46ffdd1fc34c7e16152e0.jpg)

* 遇到问题: 在此位置按删除, 光标此时的 selectionStart/selectionEnd 变为 5, 可推测规律当判断 4 的位置为 ' ' 时, 应该让 selectionStart = selectionEnd = 光标位置 - 1

