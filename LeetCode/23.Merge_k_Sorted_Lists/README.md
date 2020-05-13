### 23.Merge k Sorted Lists

Merge k `sorted linked lists` and return it as `one sorted list`. Analyze and describe its complexity.

Example:

```js
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
```

### Analyze

可以将合并 k 个排序队列转换为合并 2 个排序队列。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (lists[0]) return null
  let result = lists[0]

  for (let i = 1; i < lists.length; i++) {
    const compareList = lists[i]
    result = mergeTwoLists(cur, compareList)
  }
  return result
}

var mergeTwoLists = function(curList, compareList) {

}
```