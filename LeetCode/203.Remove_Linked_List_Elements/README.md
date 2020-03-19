### Remove Linked List Elements

Remove all elements from a linked list of integers that have value val.

Example:

```js
Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5
```

### Analyze

```js
prev  cur  next
  1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6
```

思路:

* 借助指针 prev, cur, next
  * 若 cur.val 与传入 val 相等, 则让 prev.next 指向 next

> 如果只用 cur、next 两个指针, 若 next.val 与 传入 val 相等, 则让 cur = next.next 后的 cur.val 与传入的 val 仍然相等, 此时就无法改变移除当前的 cur 了, 因此需要引入第三个指针 prev。

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  const dummyHead = new ListNode(head)
  dummyHead.next = head
  let prev = dummyHead
  let cur = dummyHead.next

  while (cur) {
    let next = cur.next
    if (cur.val === val) {
      prev.next = next
    } else {
      prev = cur
    }
    cur = next
  }

  return dummyHead.next
}
```

### Similar Title

21, 82(Sister Title)