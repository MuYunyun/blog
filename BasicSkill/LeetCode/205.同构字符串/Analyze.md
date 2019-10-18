### title

给定两个字符串 s 和 t，判断它们是否是同构的。

`如果 s 中的字符可以被替换得到 t, 那么这两个字符串是同构的`。

`所有出现的字符都必须用另一个字符替换，同时保留字符的顺序`。两个字符不能映射到同一个字符上，但字符可以映射自己本身。

示例 1:

```js
输入: s = "egg", t = "add"
输出: true
```

示例 2:

```js
输入: s = "foo", t = "bar"
输出: false
```

示例 3:

```js
输入: s = "paper", t = "title"
输出: true
```

说明:

你可以`假设 s 和 t 具有相同的长度`。

### 题解

方法一: 字典哈希

* 遍历字符串, 使用`字典 map` 构建 s 中字符串与 t 中字符串(以及 t 中字符串与 s 中字符串)的映射关系;
  * 若发现存在`一对多`的情况, 则 s 与 t 不是同构的;
* 遍历结束, 则 s 与 t 是同构的;

> 一对多: 比如 s 为 'aa', t 为 'ab', 此时 ’a' 字符就对应了 'a'、'b' 两个字符, 即为一对多。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  const mapS = new Map()
  const mapT = new Map()
  for (let i = 0; i < s.length; i++) {
    const getS = mapS.get(s[i])
    const getT = mapT.get(t[i])
    if ((getS && getS !== t[i]) || (getT && getT !== s[i])) {
      return false
    }
    mapS.set(s[i], t[i])
    mapT.set(t[i], s[i])
  }

  return true
};
```

方法二: 判断 s 与 t 字符串中字符出现的第一个位置。(针对本题的巧妙解法, 不过推荐优先掌握方法一)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false
    }
  }
  return true
};
```

### 相关题目

202、242、290、349、350、451