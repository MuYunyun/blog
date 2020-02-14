### title

Reverse a linked list from position m to n. Do it in one-pass.

Note: 1 ≤ m ≤ n ≤ length of list.

Example:

```js
Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL
```

### Analyze

难点:

* 返回啥

```js
1 -> 2 -> 3 -> 4 -> 5
    (4 -> 3 -> 2)
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  let prev = null
  let cur = head

  while (cur !== null) {
    let next = cur.next

    cur.next = prev
    prev = cur
    cur = next
  }

  return xx
}
```

```js
Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL
```

### Sister Title

206