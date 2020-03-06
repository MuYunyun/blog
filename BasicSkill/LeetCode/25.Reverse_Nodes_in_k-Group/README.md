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

初始分析:

每间隔 k 个值进行链表反转, 目前的思考是替换链表的同时维护一个 count, count 达到 k 以后 count 清 0, 同时根据 count 是否达到 k 来判断当前组列表的下一组列表是指向原列表还是反转后的列表, 但是这样的思路需要额外的内存来存储下一组列表。有没有更好的方法呢?

思路: `尾插法`。

```js
假如 k 为 4:

初始态:
        tail
dummy    1  -> 2  -> 3  -> 4  -> 5  -> 6
prev	  cur
        headP

① 将 tail 移到要翻转部分的最后一个元素, 若移动 k 元素之前已到达链表末尾则完成每间隔 k 个值的链表翻转;
                         tail
dummy    1  -> 2  -> 3  -> 4  -> 5  -> 6
prev	  cur                     headP

② 接着依次把 cur 移到 tail 后面, 同时需要借助额外变量 prev 将 cur 的下一个节点指向 prev;
                    tail
dummy    2  -> 3  -> 4  -> 1  -> 5  -> 6
	      cur               prev  headP
                .
                .
              tail
dummy    3  -> 4  -> 2  -> 1  -> 5  -> 6
		    cur         prev        headP
                .
                .
        tail
dummy    4  -> 3  -> 2  -> 1  -> 5  -> 6
		    cur   prev              headP
```

```js
k === 3

prev
tail   head1
dummy    1     2     3     4     5

prev   head1        tail
dummy    1     2     3     4     5
	      cur

prev          tail head1
dummy    2     3    1     4     5
	      cur

prev    tail       head1
dummy    3     2    1     4     5
		    cur
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  const dummyHead = new ListNode(0)
  dummyHead.next = head
  let prev = dummyHead
  let tail = dummyHead

  while (true) {
    let count = 0
    while (tail && count !== k) {
      tail = tail.next
      count++
    }
    if (count !== k) break

    let head1 = prev.next

    while (prev.next !== tail) {
      let cur = prev.next
      prev.next = cur.next
      cur.next = tail.next
      tail.next = cur
    }

    prev = head1
    tail = head1
  }

  return dummyHead.next
}
```

```js
输入
[1,2,3,4,5]
2
输出
[]
预期结果
[2,1,4,3,5]
```