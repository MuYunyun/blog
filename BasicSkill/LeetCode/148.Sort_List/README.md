### Sort List

Sort a linked list in O(n log n) time using constant space complexity.

Example 1:

```js
Input: 4->2->1->3
Output: 1->2->3->4
```

Example 2:

```js
Input: -1->5->3->4->0
Output: -1->0->3->4->5
```

### analyze

```js
var sortList = function(head) {
  const dummy = new ListNode(0)
  dummy.next = head
  let head0 = dummy.next


}
```

### 姊妹题

147