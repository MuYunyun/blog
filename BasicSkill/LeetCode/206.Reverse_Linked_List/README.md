### title

Reverse a singly linked list.

Example:

```js
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

### Analyze

```js
      prev  cur  next
        1 -> 2 -> 3 -> 4 -> 5 -> null
null <- 1 -> 2 -> 3 -> 4 -> 5
```

step:

1. 如果 prev 为空, cur 指向 null, 如果存在 prev, cur 指向 prev;
2. 如果 next 位置为空结束迭代, 否则 cur 移动到 next 位置, prev 移动到 cur 位置, 重复步骤 1;

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
var reverseList = function(head) {
  let prev = null
  let cur = head
  let next = head.next

  while (cur.next) {
    if (prev === null) {
      cur.next = null
    } else {
      cur.next = prev
    }
    prev = cur
    cur = next
    next = next.next
  }

  return head
};
```

test case

```js
function ListNode(val) {
    this.val = val;
    this.next = null
}
var test1 = new ListNode(1)
var test2 = new ListNode(2)
var test3 = new ListNode(3)
var test4 = new ListNode(4)
var test5 = new ListNode(5)
test1.next = test2
test2.next = test3
test3.next = test4
test4.next = test5
test5.next = null
reverseList(test1)
```