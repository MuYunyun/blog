### Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

```js
Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
```

### analyze

解法一: 链表, 类似归并排序的合并过程, 见[归并排序](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/sort/merge_sort.md)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const dummyLink = new ListNode(0)
  let cur = dummyLink
  let l1Point = l1
  let l2Point = l2

  while (l1Point && l2Point) {
    if (l1Point.val < l2Point.val) {
      cur.next = l1Point
      l1Point = l1Point.next
    } else {
      cur.next = l2Point
      l2Point = l2Point.next
    }
    cur = cur.next
  }

  while (l1Point) {
    cur.next = l1Point
    cur = cur.next
    l1Point = l1Point.next
  }

  while (l2Point) {
    cur.next = l2Point
    cur = cur.next
    l2Point = l2Point.next
  }

  return dummyLink.next
}
```

解法二: 递归

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
```