### title

[title](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例:

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

### analyze

有点烧脑，日后再刷遍。

队列的思想。拿 '23' 举例，第一轮先放进 'abc'，第二轮分别以队列的方式对 a、b、c 分别进行操作 push 进 def。