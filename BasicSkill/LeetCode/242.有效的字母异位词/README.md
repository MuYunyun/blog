### 有效的字母异位词

给定两个字符串 s 和 t, 编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1:

```js
输入: s = "anagram", t = "nagaram"
输出: true
```

示例 2:

```js
输入: s = "rat", t = "car"
输出: false
```

说明:
你可以假设字符串只包含小写字母。

进阶:
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况?

### 题解

思路:

* 创建数据结构为 Map 的 map 对象;
  * 遍历 s, 将各字母出现的次数叠加存储进 map 中;
  * 遍历 t, 在 map 中减少相应字母出现的个数, 并增加 map 中未收录的字母;
* 如果最后 map 的 size 不为 0, 则 s 与 t 不是字母异位词; 否则是字母异位词;

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    const getMap = map.get(s[i])
    if (!getMap) {
      map.set(s[i], 1)
    } else {
      map.set(s[i], getMap + 1)
    }
  }

  for (let i = 0; i < t.length; i++) {
    const getMap = map.get(t[i])
    if (getMap === 1) {
      map.delete(t[i])
    } else if (getMap) {
      map.set(t[i], getMap - 1)
    } else {
      map.set(t[i], 1)
    }
  }

  if (map.size) {
    return false
  } else {
    return true
  }
};
```

### 相关题目

202、205、290、349、350、451
