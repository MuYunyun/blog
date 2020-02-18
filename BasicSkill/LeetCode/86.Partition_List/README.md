### title

Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Example:

```js
Input: head = 1->4->3->2->5->2, x = 3
Output: 1->2->2->4->3->5
```

### Analyze

思路: 遍历访问链表 head, 将链表中小于 x 与大于等于 x 的值作拆分成两个链表, 最后再将它们给链接起来。

* 易漏点: 大于等于 x 的链表的末尾的 next 应该指向 null。

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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  const listNode = new ListNode(0)
  listNode.next = head

  const smallerThanX = new ListNode(0)
  const biggerThanX = new ListNode(0)

  let cur = listNode.next
  let smallPoint = smallerThanX
  let bigPoint = biggerThanX
  while (cur) {
    if (cur.val < x) {
      smallPoint.next = cur
      smallPoint = smallPoint.next
    } else {
      bigPoint.next = cur
      bigPoint = bigPoint.next
    }

    cur = cur.next
  }

  bigPoint.next = null
  smallPoint.next = biggerThanX.next

  return smallerThanX.next
}
```