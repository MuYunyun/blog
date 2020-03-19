### 题目: 反转字符串

编写一个函数，其作用是将输入的`字符串反转过来`。输入字符串以字符数组 char[] 的形式给出。

`不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题`。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：

```js
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

示例 2：

```js
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

### 解题

方法一: 使用数组的 `reverse` 方法。

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    s.reverse()
}
```

方法二: `指针碰撞`

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  let left = 0, right = s.length - 1

  while (left <= right) {
    swap(s, left, right)
    left++
    right--
  }
}

/* 交换位置
  nums 数组, a, b 为下标
*/
var swap = function(nums, a, b) {
  const tmp = nums[a]
  nums[a] = nums[b]
  nums[b] = tmp
}
```

### 相似问题

125、167、345