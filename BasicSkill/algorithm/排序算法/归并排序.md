### 归并排序思想

1. 取一个基准点, 将数组不断拆分成左右两部分, 直到数组的长度为 1;
2. 对拆离的数组进行比较合并；

### 代码实现

```js
// 可以把它当成分函数
var mergeSort = function(arr) {
  // 将数组 arr 拆分成 [0, point) 和 [point, arr.length] 两部分
  const point = arr.length / 2
  const left = arr.slice(0, point)
  const right = arr.slice(point, arr.length)

  if (arr.length === 1) {
    return arr
  }

  return merge(mergeSort(left), mergeSort(right))
}

// 可以当作是合函数
function merge(left, right) {
  let l = 0 // 第一个数组的下标
  let r = 0 // 第二个数组的下标
  const result = []

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      result.push(left[l])
      l++
    } else {
      result.push(right[r])
      r++
    }
  }

  while (l < left.length) {
    result.push(left[l])
    l++
  }

  while (r < right.length) {
    result.push(right[r])
    r++
  }

  return result
}
```

### 归并排序与快速排序的异同

归并排序与快速排序都是用递归来实现的算法, 都是分分合合的过程。区别在于归并排序在合的过程中进行排序, 快速排序则在分的过程中进行排序。另外它们的时间复杂度都为 O(nlogn)。