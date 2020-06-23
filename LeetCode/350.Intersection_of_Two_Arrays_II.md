### title

给定两个数组, 编写一个函数来计算它们的交集。

示例 1:

```js
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
```

示例 2:

```js
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
```

说明:

输出结果中`每个元素出现的次数, 应与元素在两个数组中出现的次数一致`。
我们`可以不考虑输出结果的顺序`。

进阶:

如果给定的数组已经排好序呢？你将如何优化你的算法？
如果 nums1 的大小比 nums2 小很多，哪种方法更优？
如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

### 解题

思路: 使用字典 Map 的数据结构来统计次数。

1. 将 num1、nums2 各自出现的次数分别统计存进 nums1Map 与 nums2Map 中;
2. 根据题目说明中的条件`可以不考虑输出结果的顺序`, 因而可以以 num1、nums2 相同的 key 中较小的值为输出次数, 将其输出;

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const nums1Map = getMap(nums1)
  const nums2Map = getMap(nums2)

  const result = []

  nums1Map.forEach((nums1Value, key) => {
    const nums2MapHasKey = nums2Map.get(key)
    if (nums2MapHasKey) {
      for (let i = 0; i < Math.min(nums1Value, nums2MapHasKey); i++) {
        result.push(key)
      }
    }
  })

  return result
};

var getMap = function(arr) {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const getValue = map.get(arr[i])
    if (!getValue) {
      map.set(arr[i], 1)
    } else {
      map.set(arr[i], getValue + 1)
    }
  }
  return map
}
```

### 进阶

如果给定的两个数组是排好序的, 是否有其它解法呢?

```js

```

### 相关题

202、205、242、290、349、451