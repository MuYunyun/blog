给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

```js
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

### first code

* 思路一: 将 0 从数组中移除, 并用 count 变量计算移除 0 的个数, 最后将数组 push 回 count 个 0。

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  const length = nums.length
  let count = 0               // 0 的个数
  for (let i = 0; i < length; i++) {
    if (nums[i - count] === 0) {
      nums.splice(i - count, 1)
      count++
    }
  }
  for (let i = 0; i < count; i++) {
    nums.push(0)
  }
  return nums
}
```

* 思路二: 使用双指针

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let m = 0 // 指针一的下标, [0, m) 区域用于存储非 0 元素

  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) { // 如果存在 num[i] 不为 0, 则让其与 num[m] 交换
      if (i !== m) {
        [nums[m], nums[i]] = [nums[i], nums[m]]
      }
      m++
    }
  }
  return nums
}
```

### 同类题目

26、27、80。