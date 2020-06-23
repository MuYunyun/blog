### Title

Given a sorted linked list, delete all duplicates such that each element appear only once.

Example 1:

```js
Input: 1->1->2
Output: 1->2
```

Example 2:

```js
Input: 1->1->2->3->3
Output: 1->2->3
```

### Analyze

该题思路比较直接, 使用 cur, next 两个指针表示当前值和下一值, 若 cur 指针的值与 next 指针的值相等, 则将 next 指针往后移动一位即可。

```js
cur   next
 1  ->  1  ->  2  ->  3  ->  3

cur          next
 1  ->  1  ->  2  ->  3  ->  3
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  const listNode = new ListNode(0)
  listNode.next = head
  let cur = listNode.next
  while (cur) {
    let next = cur.next
    while (next && next.val === cur.val) {
      next = next.next
    }
    cur.next = next
    cur = cur.next
  }
  return listNode.next
}
```

### Same Type Question

2、86、328、445