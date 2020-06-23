### Sort List

Sort a linked list in `O(n logn)` time using `constant space` complexity.

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

根据题意的要求, 锁定使用`归并排序`算法, 但是相对数组的归并排序, 有以下两个难点:

* 问题一: 如何确认链表的中点?
* 问题二: 链表如何 merge?

针对问题一, 可以使用`快慢指针`来确认链表的中点, 快指针每次走两步, 慢指针每次走一步, 慢指针最后的位置就是链表的中点位置, 步骤图解如下:

针对奇数情形:

```js
          slow
          quick
dummy  ->  1  ->  null

                 slow  quick
dummy  ->  4  ->  2  ->  1  ->  null

偶数:
          slow  quick
dummy  ->  1  ->  2  ->  null
```

针对偶数情形:

```js
          slow   quick
dummy  ->  1  ->  2  ->  null
```

此外另外一个难点是如何进行 merge 操作。大体思路为

1. 在 leftList 中找到比 rNode 小且最接近 rNode 的值 lNode;
2. 将 rNode 插入 lNode 的后面;

步骤图解如下:

```js
lNode                         rNode
dummy -> 1 -> 3 -> null         2 -> 4 -> null

             lNode            rNode
dummy -> 1 -> 2 -> 3 -> null    4 -> null
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
  if (slow === quick) return dummy.next
  let rightList = slow.next
  slow.next = null
  let leftList = dummy
  return merge(sortList(leftList.next), sortList(rightList))
}

var merge = function(leftList, rightList) {
  const dummy = new ListNode(0)
  dummy.next = leftList
  let lNode = dummy
  let rNode = rightList

  while (lNode && rNode) {
    while (lNode.next && lNode.next.val < rNode.val) {
      lNode = lNode.next
    }
    let rNext = rNode.next
    rNode.next = lNode.next
    lNode.next = rNode
    rNode = rNext
  }
  return dummy.next
}
```

### 姊妹题

147、143、234