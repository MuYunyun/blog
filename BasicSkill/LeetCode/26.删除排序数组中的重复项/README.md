### 题目

给定一个`排序数组`, 你需要`在原地删除重复出现的元素, 使得每个元素只出现一次, 返回移除后数组的新长度`。

`不要使用额外的数组空间, 你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成`。

示例 1:

```js
给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
```

示例 2:

```js
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

说明:

为什么返回数值是整数, 但输出的答案是数组呢?

请注意, 输入数组是以“引用”方式传递的, 这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```js
// nums 是以“引用”方式传递的。也就是说, 不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### 解题

解法一: 一般思路

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const cacheObj = {}
  let count = 0
  while (count < nums.length) {
    if (cacheObj[nums[count]]) {
      nums.splice(count, 1)
      count--
    } else {
      cacheObj[nums[count]] = nums[count].toString() // 防止 0 被判断为 false
    }
    count++
  }
  return nums.length
}
```

解法二: 双指针

![](http://with.muyunyun.cn/d3b1ba4aff45282b1ae4740d530c8834.jpg)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length <= 1) return nums.length
  let cur = 0 // 新数组的下标
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[cur]) {
      nums[cur + 1] = nums[i]
      cur++
    }
  }
  return cur + 1
}
```

### 同类题目

27、80、283。