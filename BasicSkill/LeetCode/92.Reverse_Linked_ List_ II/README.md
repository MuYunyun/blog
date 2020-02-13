### title

Reverse a linked list from position m to n. Do it in one-pass.

Note: 1 ≤ m ≤ n ≤ length of list.

Example:

```js
Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL
```

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
  let count = 1

  while (cur !== null) {
    let next = cur.next
    if (count < m) {
      prev = cur
      cur = next
    } else (count >= m && count ) {

    }

    cur = cur.next
    count++
  }


}
```

### Sister Title

206