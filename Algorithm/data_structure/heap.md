### Heap

堆是通过一维数组来实现的树结构。

### 堆节点的访问

在数组起始位置为 0 的情形中:

* 父节点 i 的左子节点在位置 `(2i + 1)`;
* 父节点 i 的右子节点在位置 `(2i + 2)`;
* 子节点 i 的父节点在位置 `Math.floor((i - 1) / 2)`;

### Max Heap && Min Heap

* `Max Heap`: 每个节点都`大于等于左右子节点`的值。用于`升序排序`。见 [heap_sort](https://github.com/MuYunyun/blog/blob/master/Algorithm/algorithm/sort/heap_sort.md)

```js
           8
        ↙     ↘
     3          7
  ↙    ↘      ↙   ↘
2        1  5        4
```

* `Min Heap`: 每个节点都`小于等于左右子节点`的值。用于`降序排序`。

```js
          1
        ↙    ↘
      2        4
   ↙    ↘    ↙   ↘
  5       3 8      7
```

### Priority Queue Based Heap

It's usually to use the two ways called enqueue and dequeue:

* `enqueue(value)`: insert value into the heap;
  * Because the value is inserted into the last heap, we'll use `sift up` to adjust position;

```js
           10
        ↙     ↘
     3          7
           |
           ↓
      `enqueue(9)`
           10
        ↙     ↘
     3          7
  ↙ sift up
9
           |
           ↓
           10
        ↙     ↘
     9          7
  ↙ sift up
3
```

* `dequeue()`: to pick the smallest or the biggest element from the heap;
  * It'll swap the endest element with the first element, and then keep the heap length reduce 1. If so, only do once `sift down` operation in the first element to heapify.

```js
           8
        ↙     ↘
     3          7
  ↙    ↘      ↙   ↘
2        1  5       4
          |
  pick 8, move 4 to top
          ↓

           4
        ↙     ↘ (swap)
     3          7
  ↙    ↘      ↙
2        1  5
          |
  sift down 4 to rebuild max heap.
          ↓

           7
        ↙     ↘
     3          4
  ↙    ↘      ↙
2        1  5
          |
  redo the last steps
          ↓
           7
        ↙     ↘
     3          5
  ↙    ↘      ↙
2        1  4
```

```js
var len

/**
 * to build max heapify from bottom to top;
 * the last subscript's parent subscript is Math.floor((len - 1) / 2)
 */
var buildMaxHeapify = function(arr) {
  len = arr.length

  for (let i = Math.floor((len - 1) / 2); i >= 0; i--) {
    siftDown(arr, i)
  }
  return arr
}

/**
 * Insert a value into heap. It's an operation called sift up.
 */
var enqueue = function(arr, value) {
  arr.splice(len, 0, value)
  len++
  siftUp()
}

/**
 * to keep max heap, it's an operation called sift up.
 */
var siftUp = function() {
  let enqueueValSubscript = len - 1
  let parent = Math.floor(enqueueValSubscript / 2)
  while (parent > 0 && arr[parent] < arr[enqueueValSubscript]) {
    swap(arr, parent, enqueueValSubscript)
    enqueueValSubscript = parent
    parent = Math.floor(enqueueValSubscript / 2)
  }
}

/*
 * to pick the smallest or the biggest element from the heap and return it;
 * Then t'll swap the endest element with the first element, and then keep the
 * heap length reduce one. If so, only do once sift down operation in the first element to keep heapify.
 */
var dequeue = function() {
  const maxValue = arr[0]
  swap(arr, len - 1, 0)
  len--
  siftDown(arr, 0)
  return maxValue
}

/**
 * to keep max heap, it's an operation called sift down.
 */
var siftDown = function(arr, i) {
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
    siftDown(arr, maxSubscript)
  }
}

// swap two value in arr
var swap = function(arr, pointOne, pointTwo) {
  const tmp = arr[pointOne]
  arr[pointOne] = arr[pointTwo]
  arr[pointTwo] = tmp
}
```

Test case one:

```js
input: var arr = [5, 2, 7, 3, 1, 8, 4]

buildMaxHeapify(arr) // [8, 3, 7, 2, 1, 5, 4]
           8                                           8
        ↙     ↘          enqueue(arr, 6)            ↙     ↘
     3          7        --------------->         6          7
  ↙    ↘      ↙   ↘                            ↙    ↘      ↙   ↘
2        1  5       4                        3        1   5       4
                                           ↙
                                         2

                                     7
        return 8                  ↙     ↘
        dequeue()               6         5
    ---------------->        ↙    ↘     ↙   ↘
                           3       1   2      4
```
