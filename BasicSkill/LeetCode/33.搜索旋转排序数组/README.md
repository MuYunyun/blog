### title

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如, 数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值, 如果数组中存在这个目标值, 则返回它的索引, 否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

示例 2:

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

### analyze

思路: 考虑使用二分法? 这题难度觉得超纲了。然后再想。

```js
// 这道题卡在如何确定返回的指标
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const length = nums.length
  const middle = Math.floor(length / 2)
  const leftArr = nums.slice(0, middle)
  const rightArr = nums.slice(middle, length)

  if (isOrder(leftArr)) {
    sortByDivided(leftArr, target)
  } else {
    search(leftArr, target)
  }

  if (isOrder(rightArr)) {
    sortByDivided(rightArr, target)
  } else {
    search(rightArr, target)
  }
};

var isOrder = function(arr) {
  return arr[0] < arr[arr.length - 1]
}

var sortByDivided = function(arr, target) {
  const length = arr.length
  let left = 0
  let right = length
  let middle

  while (left <= right) {
    middle = Math.floor((left + right) / 2)
    if (target > arr[middle]) {
      left = middle + 1
    } else if (target < arr[middle]) {
      right = middle - 1
    } else if (target === arr[middle]) {
      return middle
    }
  }

  return false
}
```