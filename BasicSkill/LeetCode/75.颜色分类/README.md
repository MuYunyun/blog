### 题目

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:

不能使用代码库中的排序函数来解决这道题。

示例:

```js
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

进阶：

一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出 0、1 和 2 元素的个数，然后按照 0、1、2 的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？

### 解题

解法一: 计数排序, 在该题目中分别统计出 0、1、2 出现的个数, 并将相应个数的 0、1、2 放回数组。

> 计数排序适用于数组元素非常有限的场景。

```js
输入
[2,0,2,1,1,0]
输出
[0,1,2,1,1,0]
预期结果
[0,0,1,1,2,2]
```

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let countObj = {}
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i]
    if (typeof(countObj[`${key}`]) === 'number') {
      countObj[`${key}`] = countObj[`${key}`] + 1
    } else {
      countObj[`${key}`] = 1
    }
  }

  const count0 = countObj[0] || 0
  const count1 = countObj[1] || 0
  const count2 = countObj[2] || 0
  for (let i = 0; i < count0 + count1 + count2; i++) {
    if (i < count0) {
      nums[i] = 0
    } else if (i >=count0 && i < count0 + count1) {
      nums[i] = 1
    } else if (i >= count1 && i < count0 + count1 + count2) {
      nums[i] = 2
    }
  }
}
```

解法二: 三路快排

思路: 三路快排的思想是同时排序小于选定值，等于选定值和大于选定值三种情况。在这里我们随机选取一个值 v 作为分界点, 分别排序小于 v，等于 v 和大于 v 的。该题中 v 为 1。

![](http://with.muyunyun.cn/9617f034f2e7d0535ac73d51612d2f07.jpg)

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  /**
   * nums[0, zero] = 0
   * nums[two, nums.length - 1] = 2
   */
  let [zero, two] = [0, nums.length - 1]
  for (let i = 0; i <= two; i++) {
    if (nums[i] === 0) {
      [nums[i], nums[zero]] = [nums[zero], nums[i]]
      zero++
    }

    if (nums[i] === 2) {
      [nums[i], nums[two]] = [nums[two], nums[i]]
      i--
      two--
    }
  }
}
```

该算法的时间复杂度为 O(n), 空间复杂度为 O(1)。

### 相似题目

88、215