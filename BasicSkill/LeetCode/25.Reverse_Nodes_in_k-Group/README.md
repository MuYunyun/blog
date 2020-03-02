### Reverse Nodes in k-Group

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

Example:

Given this linked list: 1->2->3->4->5

For k = 2, you should return: 2->1->4->3->5

For k = 3, you should return: 3->2->1->4->5

Note:

Only constant extra memory is allowed.
You may not alter the values in the list's nodes, only nodes itself may be changed.

### Analyze

```js
prev   cur    next
        1  ->  2  ->  3  ->  4  ->  5
                .
                .
prev   next -> cur
        1  ->  2  ->  3  ->  4  ->  5
```

每 k 个值之间进行链表反转, 目前的思考是替换的同时维护一个 count, count 达到 k 以后 count 清 0; 同时根据 count 是否达到 k 来进行判断当前列表的下一个列表是指向原列表还是反转后的列表。

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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {

}
```