### 二分查找思想

1. 取已排列好数组的中间值
2. 把需查找的值和中间值进行比较
3. 如果比中间值小, 则对前半部分进行类似操作；如果比中间值大, 则对后半部分进行类似操作；

### 二分查找代码实现

```js
// arr 为指定数组, target 为目标元素
function binarysearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    const middlePoint = Math.floor((left + right) / 2)
    let middle = arr[middlePoint]
    if (middle > target) {
      right = middlePoint - 1
    } else if (middle < target) {
      left = middlePoint + 1
    } else {
      return middle
    }
  }

  return '数组中目标元素不存在'
}
```

### 以二分查找法看如何写出正确的程序

* 明确变量的含义。比如在上述代码中, left 与 right 就是变量, 其意味当前查找数组中的左边界与右边界。[left, ...right];
* 循环不变量。在上述代码中, 循环中改变变量(left, right)的取值, 但是不改变变量的含义。[left, ...right];
* 小数据量调试。(快速, 准确, 耐心)
* 大数据量调试。(能测出程序的性能)

### 真题

> 题目: 题目: 在一个二维数组中, 每一行都按照从左到右递增的顺序排序, 每一列都按照从上到下递增的顺序排序。请完成一个函数, 输入这样的一个二维数组和一个整数, 判断数组中是否含有该整数。

```js
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16

function find(arr, n) {
  let x = 0
  let y = arr[x].length - 1
  while (x < arr.length && y > 0) {
    if (n > arr[x][y]) {
      x++
    } else if (n < arr[x][y]) {
      y--
    } else {
      return '找到目标元素'
    }
  }
  return '目标元素不存在'
}
```

这道题严格不算是二分查找, 不过用到了类似的思维。

> 求开方

[Leetcode : 69. Sqrt(x) (Easy)](https://leetcode.com/problems/sqrtx/description/)

思路: 满足 0 < sqrt < x && sqrt === x / sqrt, 转化为二分查找求 sqrt

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) { // 8
    let left = 1
    let right = x
    while (left <= right) {
        const mid = Math.floor((left + right) / 2) // 4 2 3
        const sqrt = x / mid // 2 4 2.7
        if (sqrt === mid) return sqrt
        if (sqrt > mid) {
            left = mid + 1 // 3
        } else if (sqrt < mid) {
            right = mid - 1 // 3 2
        }
    }
    return right // 这里返回 right 而不是 left 的原因: 用了 Math.floor, mid 会偏小, 相应 sqrt 会偏大
}
```

> 有序数组的 Single Element

[Leetcode : 540. Single Element in a Sorted Array (Medium)](https://leetcode.com/problems/single-element-in-a-sorted-array/description/)

题目描述: 一个有序数组只有一个数不出现两次, 找出这个数。