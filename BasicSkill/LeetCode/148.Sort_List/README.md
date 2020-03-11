### Sort List

Sort a linked list in `O(n log n)` time using `constant space` complexity.

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

该题会用到如下思路:

* `归并排序思想`;
* 如何确认链表的中点? 使用`快慢指针`, 快指针每次走两步, 慢指针每次走一步;
  * 处理奇数链表/偶数链表, 慢指针最后的位置就是链表的中点位置;
* 链表如何 merge?

```js
奇数:
          slow
          quick
dummy  ->  1  ->  null

偶数:
          slow   quick
dummy  ->  1  ->  2  ->  null
```

```js
                       quick
                 slow
dummy  ->  4  ->  2  ->  1
```

```js
var sortList = function(head) {
  const dummy = new ListNode(0)
  dummy.next = head
  let head0 = dummy.next

  let slow = dummy, quick = dummy
  while (quick.next) {
    quick = quick.next
    slow = slow.next
    quick.next && (quick = quick.next)
  }
  // if the slow list is equal to the quick list, it means the current list only has one node.
  if (slow === quick) return dummy
  let rightList = slow.next
  slow.next = null
  let leftList = dummy
  return merge(sortList(leftList.next), sortList(rightList))
}

var merge = function(leftList, rightList) {
  const dummy = new ListNode(0)
  let lNode = leftList
  let rNode = rightList
  if (lNode) {

  }
}
```

### 姊妹题

147