### 题目

给定 n 个非负整数 a1, a2, ..., an, 每个数代表坐标中的一个点 (i, ai)。在坐标内画 n 条垂直线, 垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线, 使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明: 你不能倾斜容器, 且 n 的值至少为 2。

-[](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下, 容器能够容纳水(表示为蓝色部分)的最大值为 49。

示例:

```js
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

### 解题

暴力法: 时间复杂度 O(n^2), 空间复杂度 O(1);

```js
// 暴力法
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxArea = 0
  const length = height.length
  for (let i = 0; i < length; i++) {
    for (let y = i + 1; y < length; y++) {
      result = Math.min(height[i], height[y]) * (y - i)
      if (result > maxArea) {
        maxArea = result
      }
    }
  }
  return maxArea
}
```

双指针法: 一个指针指向首位, 一个指针指向末尾; 因为受限于高度低的那一方, 所以移动高度较低的那一位; 这样子只要遍历一次就能得出结果, 时间复杂度 O(n), 空间复杂度 O(1);

```js
// 双指针法
var maxArea = function (height) {
  let head = 0, tail = height.length - 1, maxArea = 0
  while (head < tail) {
    result = Math.min(height[head], height[tail]) * (tail - head)
    if (result > maxArea) {
      maxArea = result
    }
    if (height[head] <= height[tail]) {
      head++
    } else {
      tail--
    }
  }
  return maxArea
}
```

### 类似题目

125、167、344、345