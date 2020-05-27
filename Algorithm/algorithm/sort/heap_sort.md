### Heap Sort

> prefix knowlege: [heap](https://github.com/MuYunyun/blog/blob/master/Algorithm/data_structure/heap.md)

题目: 给定数组 `[5, 2, 7, 3, 1, 8, 4]`, 使用堆排序对其进行升序排列。

* 步骤一: 构造大顶堆;

```js
          5
        ↙   ↘ convert
     2         7
          |
    因为子节点 7 大于 5, 因此作 convert, 结果如下
          ↓

          7
        ↙   ↘
     2         5
          |
    依此类推, 构造出大顶堆。
          ↓

           8
        ↙     ↘
     3          7
  ↙    ↘      ↙   ↘
2        1  5       4
```

* 步骤二: 取出顶部元素, 将数组末尾元素移到顶部(目的是为了保持移除了顶部元素后的数组长度减少 1);
* 步骤三: 如果存在顶部元素的子元素大于顶部元素的情形, 对调它们(维持 max heap);

```js
           8
        ↙     ↘
     3          7
  ↙    ↘      ↙   ↘
2        1  5       4
          |
  取出顶部 8, 将数组末尾元素 4 移到顶部
          ↓

           4
        ↙     ↘ (对调)
     3          7
  ↙    ↘      ↙
2        1  5
          |
  如果存在顶部元素的子元素大于顶部元素的情形, 对调它们, 重新构造 max heap.
          ↓

           7
        ↙     ↘
     3          4
  ↙    ↘      ↙
2        1  5
          |
  重复上述 3 个步骤, 直到堆中的元素为空

```

下面来实现上述步骤:

```js
var heap_sort = function(arr) {
  const result = []
  let material = arr

  while (material.length > 0) {
    const maxHeapArr = builtMaxHeap(material)
    result.unshift(maxHeapArr[0])
    maxHeapArr[0] = maxHeapArr[maxHeapArr.length - 1]
    material = maxHeapArr.slice(0, maxHeapArr.length - 1)
  }

  return result
}

// input: [5, 2, 7, 3, 1, 8, 4]
// output: to build big heap [8, 3, 7, 2, 1, 5, 4]
var builtMaxHeap = function(arr) {
  let parent, compareChild
  for (let i = 0; i < arr.length; i++) {
    parent = Math.floor((i - 1) / 2)
    compareChild = i
    while (parent >= 0) {
      if (arr[parent] < arr[compareChild]) {
        swap(arr, parent, compareChild)
        compareChild = parent
        parent = Math.floor((compareChild - 1) / 2)
      } else {
        parent = -1
      }
    }
  }
  return arr
}

// swap two value in arr
var swap = function(arr, pointOne, pointTwo) {
  const tmp = arr[pointOne]
  arr[pointOne] = arr[pointTwo]
  arr[pointTwo] = tmp
}
```

理想情况下, 堆排序时间复杂度应为 nlogn, 空间复杂度应为 1, 上述实现的代码中没有达到这一复杂度的。参考社区代码后重写:
  * 由 len 控制执行时机;
  * 对 arr 进行操作不引入额外变量;

```js
var len
var heap_sort = function(arr) {
  buildMaxHeapify(arr)

  while (len > 1) {
    swap(arr, len - 1, 0)
    len--
    keepMaxHeapify(arr, 0)
  }

  return arr
}


/**
 * to build max heapify from bottom to top;
 * the last subscript's parent subscript is Math.floor((len - 1) / 2)
 */
var buildMaxHeapify = function(arr) {
  len = arr.length

  for (let i = Math.floor((len - 1) / 2); i >= 0; i--) {
    keepMaxHeapify(arr, i)
  }
}

/**
 * to keep max heap
 */
var keepMaxHeapify = function(arr, i) {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let maxSubscript = i

  if (left < len && arr[left] > arr[maxSubscript]) {
    maxSubscript = left
  }

  if (right < len && arr[right] > arr[maxSubscript]) {
    maxSubscript = right
  }

  if (maxSubscript !== i) {
    swap(arr, maxSubscript, i)
    keepMaxHeapify(arr, maxSubscript)
  }
}

/**
 * swap two value in arr
 */
var swap = function(arr, pointOne, pointTwo) {
  const tmp = arr[pointOne]
  arr[pointOne] = arr[pointTwo]
  arr[pointTwo] = tmp
}
```
