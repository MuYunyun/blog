### 堆

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

### 基于堆的优先队列

* enqueue

```js
var len

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
 * insert value into heap.
 */
var enqueue = function(arr, value) {
  arr.push(value)
  keepMaxHeapify(arr, arr.length - 1)
}

/**
 *
 */
var dequeue = function() {

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
```


```js
/**
 * get current heap size
 */
var getSize = function() {

}

/**
 * find max element
 */
var findMax = function() {

}

/**
 * extract max element
 */
var dequeue = function() {

}

/**
 * insert value into heap
 */
var enqueue = function(value) {

}
```