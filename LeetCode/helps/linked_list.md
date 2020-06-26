```js
// ---- some useful fn to do with linked_list ----

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
})(1, 2, 3, 4, 5)

/**
 * print the linked list
 */
var printList = function (list) {
  let cur = list
  let str = ''
  while (cur) {
    str += `${cur.val} -> `;
    cur = cur.next
    cur === null && (str += 'null')
  }
  console.log(str)
}
```