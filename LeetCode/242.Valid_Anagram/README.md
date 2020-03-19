### 242. Valid Anagram

Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

```js
Input: s = "anagram", t = "nagaram"
Output: true
```

Example 2:

```js
Input: s = "rat", t = "car"
Output: false
```

Note:
You may assume the `string contains only lowercase alphabets`.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?

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
