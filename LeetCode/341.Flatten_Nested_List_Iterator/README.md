### 341.Flatten Nested List Iterator

Given a nested list of integers, implement an `iterator` to flatten it.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:

```js
Input: [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
```

Explanation: By calling next repeatedly until hasNext returns false,
             the order of elements returned by next should be: [1,1,2,1,1].

Example 2:

```js
Input: [1,[4,[6]]]
Output: [1,4,6]
```

Explanation: By calling next repeatedly until hasNext returns false,
             the order of elements returned by next should be: [1,4,6].

### analyze

该题需注意的点: 比如 [1, [4]] 数组里面的 1, [4] 得通过 `getInteger` 与 `getList` 获取得到。

### 递归法

```js
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
  this.printArr = []
  this.resetArr(nestedList)
}

NestedIterator.prototype.resetArr = function(nestedList) {
  if (!nestedList && !nestedList.length) return
  for (let i = 0; i < nestedList.length; i++) {
    const curList = nestedList[i]
    if (curList.isInteger()) {
      this.printArr.unshift(curList.getInteger())
    } else {
      this.resetArr(curList.getList())
    }
  }
}

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  return this.printArr.length > 0
}

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  return this.printArr.pop()
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
```

### 迭代法

```js
[[1,1],2,[3,3]]

[1,1], 2, [3, 3]

[1, 1], 2, 3, 3

1, 1, 2, 3, 3
```

```js
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
  this.printArr = []
  if (!nestedList) return
  this.stackList = []
  this.stackList.push(nestedList)
  while (this.stackList.length > 0) {
    const pickValue = this.stackList.pop()
    for (let i = 0; i < pickValue.length; i++) {
      if (pickValue[i].isInteger()) {
        this.printArr.unshift(pickValue[i].getInteger())
      } else {
        this.stackList.push(pickValue[i])
      }
    }
  }
}

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  return this.printArr.length > 0
}

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  return this.printArr.pop()
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
```
