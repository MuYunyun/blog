### title

给定两个数组，编写一个函数来计算它们的交集。

示例 1:

```js
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]
```

示例 2:

```js
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]
```

说明:

输出结果中的每个元素一定是`唯一的`。
我们可以不考虑输出结果的顺序。

### 题解

因为题目明确了输出结果中的每个元素一定是`唯一的`, 因而可以使用集合 Set 唯一的特性, 完成题解。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const resultSet = new Set()
  const num1Set = new Set(nums1)
  for (let i = 0; i < nums2.length; i++) {
    if (num1Set.has(nums2[i])) {
      resultSet.add(nums2[i])
    }
  }

  return [...resultSet]
}
```

### 进阶思考

如果给定的两个数组是排好序的, 是否有其它解法呢?

示例 1:

```js
输入: nums1 = [1,1,2,2], nums2 = [2,2]
输出: [2]
```

示例 2:

```js
输入: nums1 = [4,5,9], nums2 = [4,4,8,9,9]
输出: [4,9]
```

大致想法: 可以使用移动指针的方式。

### 相关题目

202、205、242、290、350、451