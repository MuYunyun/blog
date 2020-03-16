### Remove Nth Node From End of List

Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.

Note:

Given n will always be valid.

Follow up:

Could you do this in one pass?

### Analyze

相较于 [Remove_Linked_List_Elements](https://github.com/MuYunyun/blog/blob/master/BasicSkill/LeetCode/203.Remove_Linked_List_Elements/README.md), 多了一步要找寻到删除节点的上一个节点的步骤。

* 思路一: 遍历一遍链表得到链表个数 sum, 则 sum - n 表示正向数过来需删除的链表节点的位数;
* 思路二: 双指针的思想确立要删除的节点;

```js
1 -> 2 -> 3 -> 4 -> 5
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {

}
```