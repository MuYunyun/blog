### Remove Duplicates from Sorted List II

Given a `sorted linked list`, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

Example 1:

```js
Input: 1->2->3->3->4->4->5
Output: 1->2->5
```

Example 2:

```js
Input: 1->1->1->2->3
Output: 2->3
```

### Analyze

思路: `快慢指针`, 用快指针跳过有重复值的链表, 慢指针负责和快指针拼接! 思路比较精妙, 后面值得二刷。

```js
s cur/q                     // s: slow; q: quick
    1 -> 1 -> 1 -> 2 -> 3
              .
              .
s->cur        q
    1 -> 1 -> 1 -> 2 -> 3
              .
              .
        next
s --------------->cur/q
    1 -> 1 -> 1 -> 2 -> 3
              .
              .
                   s   cur/q
    1 -> 1 -> 1 -> 2 -> 3
              .
              .
                        s
    1 -> 1 -> 1 -> 2 -> 3
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
  const dummyHead = new ListNode(0)
  dummyHead.next = head

  let slowPoint = dummyHead

  while(slowPoint.next) {
    let cur = slowPoint.next
    let quickPoint = cur
    while(quickPoint.next && quickPoint.next.val === cur.val) {
      quickPoint = quickPoint.next
    }

    if (cur === quickPoint) {
      slowPoint = slowPoint.next
    } else {
      slowPoint.next = quickPoint.next
    }
  }

  return dummyHead.next
}
```
