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
       1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5              .
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
})(1, 1, 1, 2, 3)

var deleteDuplicates = function(head) {
  const dummyHead = new ListNode(0)

  let prev = dummyHead
  let cur = prev.next

  while (cur) {
    let next = cur.next
    debugger
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

deleteDuplicates(list)
```