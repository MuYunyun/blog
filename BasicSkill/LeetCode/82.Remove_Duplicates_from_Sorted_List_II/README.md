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

```js
 cur  next
  1 -> 1 -> 1 -> 2 -> 3
            .
            .
      cur  next
  1 -> 1 -> 1 -> 2 -> 3
            .
            .
           cur  next
  1 -> 1 -> 1 -> 2 -> 3
            .
            .
                cur  next
  1 -> 1 -> 1 -> 2 -> 3
            .
            .
                prev cur
  1 -> 1 -> 1 -> 2 -> 3


prev  cur  next
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
                  .
                  .
      prev cur  next
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
                  .
                  .
           prev cur  next
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
                  .
                  .
           prev      cur next afterNext
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
                  .
                  .
           prev                     cur
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
```

```js
    1 -> 1 -> 1 -> 1 -> 3 -> 3
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
  let prev = dummyHead
  let cur = prev.next

  while (cur) {
    let next = cur.next
    if (next && cur.val === next.val) {
      while (next && cur.val === next.val) {
        cur = next
        next = cur.next
        if (next) {
          let afterNext = next.next
          if (afterNext && next.val === afterNext.val) {
            cur = afterNext
            next = cur.next
          }
        }
      }
      cur = next
      prev.next = cur
    }
    prev = cur
    cur = prev ? prev.next : null
  }
  return dummyHead.next
}
```

### test

输入：
[1,1,1,1,3,3]

输出:
[3,3]

预期：
[]

```js

    1   1   1   1   3   3
```

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * create init linked list for leetcode.
 */
var list = (function createLinkedList(...args) {
  const reverseArgs = args.reverse()
  const tmplistNode = new ListNode(0)
  let length = reverseArgs.length
  let cur = new ListNode(reverseArgs[length - 1])
  tmplistNode.next = cur
  while (length-- && length >= 1) {
    let next = new ListNode(reverseArgs[length - 1])
    cur.next = next
    cur = next
  }

  return tmplistNode.next
})(1, 1, 1, 1, 3, 3)

var deleteDuplicates = function(head) {
  const dummyHead = new ListNode(0)
  dummyHead.next = head

  let slowPoint = dummyHead
  let quickPoint = dummyHead
  debugger
  while(slowPoint.next) {
    while(quickPoint.next && quickPoint.next.val === slowPoint.val) {
      quickPoint = quickPoint.next
    }

    if (slowPoint === quickPoint) {
      slowPoint = slowPoint.next
      quickPoint = slowPoint
    } else {
      slowPoint.next = quickPoint
    }
  }

  return dummyHead.next
}

deleteDuplicates(list)
```

思路: `快慢指针`, 用快指针跳过有重复值的链表, 慢指针负责和快指针拼接!

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

  let cur = dummyHead.next

  while(cur) {
    let slowPoint = cur
    let quickPoint = slowPoint
    while(quickPoint.next && quickPoint.next.val === slowPoint.val) {
      quickPoint = quickPoint.next
    }

    if (slowPoint === quickPoint) {
      slowPoint = slowPoint.next
      quickPoint = slowPoint
    } else {
      slowPoint.next = quickPoint
    }
  }

  return dummyHead.next
}
```