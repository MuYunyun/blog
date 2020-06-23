### title

Given an array of strings, group anagrams together.

Example:

```js
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

Note:

All inputs will be in lowercase.
The order of your output does not matter.

### analyze

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const tmpObj = {}

  for (let i = 0; i < strs.length; i++) {
    const sortStr = strs[i].split('').sort().join('')
    if (tmpObj[sortStr]) {
      tmpObj[sortStr].push(strs[i])
    } else {
      tmpObj[sortStr] = [strs[i]]
    }
  }

  const result = []

  const keyArr = Object.keys(tmpObj)
  for (let i = 0; i < keyArr.length; i++) {
    result.push(tmpObj[keyArr[i]])
  }

  return result
}
```