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

此题在两个队列归并算法的基础上扩展为 k 个队列的合并过程。

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
  const dummyLists = new ListNode(0)
  dummyLists.next = lists[0]
  let cur = dummyLists.next

  for (let i = 1; i < lists.length; i++) {

    while (cur) {

      cur = cur.next
    }
  }
}
```