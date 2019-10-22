### title

给定一个字符串, 请将字符串里的字符按照出现的频率`降序排列`。

示例 1:

```js
输入:
"tree"

输出:
"eert"
```

解释: 'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。

示例 2:

```js
输入:
"cccaaa"

输出:
"cccaaa"
```

解释: 'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。

示例 3:

```js
输入:
"Aabb"

输出:
"bbAa"
```

解释: 此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。

### 题解

思路: 根据题意, 本题用 Map 来存储字符出现的频率, 难点在如何处理 Map 中对象出现的频率? 以下解法使用 arr 将 map 里的值存储转化为 `[{ key, value }]` 的形式, 最后使用 JS 的 sort 方法来完成题解。

```js
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    const getMap = map.get(s[i])
    if (!getMap) {
      map.set(s[i], 1)
    } else {
      map.set(s[i], getMap + 1)
    }
  }

  const arr = []
  // for (let i = 0; i < map.keys.length; i++) {
  //   const key = map.keys[i]
  for (let key of map.keys()) {
    arr.push({
      key,
      value: map.get(key)
    })
  }

  // todo 后续实现下以下排序
  arr.sort((a, b) => b.value - a.value)

  const result = arr.map(r => {
    let str = ''
    for (let i = 0; i < r.value; i++) {
      str = str + r.key
    }
    return str
  }).join('')

  return result
};
```

### 归类

map