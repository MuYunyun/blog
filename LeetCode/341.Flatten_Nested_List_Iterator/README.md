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

该题需注意的点: [1, [4]] 里的子项 1, [4] 分别通过 `getInteger` 与 `getList` 获取到。

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

相对递归法, 迭代法需要额外维护一个`系统调用栈`, 然后使用`颜色标记法`完成题解。

颜色标记法思路:

* 未访问过的列表标记为`白色`, 访问过的列表标记为`灰色`;
* 从栈顶取出访问元素:
   * 若为灰色元素, 则打印之;
   * 若为白色元素, 则遍历子列表:
      * 若子列表为列表, 则将其`标记为白色`并推入栈;
      * 若子列表为数字, 则将其`标记为灰色`并推入栈;

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
  this.stackList.push({ color: 'white', list: nestedList })
  while (this.stackList.length > 0) {
    const { color, list } = this.stackList.pop()
    if (color === 'gray') {
      this.printArr.unshift(list)
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].isInteger()) {
          this.stackList.push({ color: 'gray', list: list[i].getInteger() })
        } else {
          this.stackList.push({ color: 'white', list: list[i].getList() })
        }
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
  return this.printArr.shift()
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
```

### Similar Title

94、144、145