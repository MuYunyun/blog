### Insertion_Sort_List

Sort a linked list using insertion sort.

![](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

A graphical example of insertion sort. The partial sorted list (black) initially contains only the first element in the list.
With each iteration one element (red) is removed from the input data and inserted in-place into the sorted list.

Algorithm of Insertion Sort:

1. Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list.
2. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
3. It repeats until no input elements remain.

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

### Analyze

head0: 当前已排序列表的最后一个;
pre: 用于遍历当前已排序列表;

```js
       head0
dummy -> 4 -> 2 -> 1 -> 3
            .
            .
pre    head0
dummy -> 4 -> 2 -> 1 -> 3
            .
            .
pre         head0
dummy -> 2 -> 4 -> 1 -> 3
            .
            .
             pre head0
dummy -> 1 -> 2 -> 4 -> 3
            .
            .
                      head0
dummy -> 1 -> 2 -> 3 -> 4
```

```js
        head0
dummy -> -1 -> 5 -> 3 -> 4 -> 0
              .
              .
         pre head0
dummy -> -1 -> 5 -> 3 -> 4 -> 0
              .
              .
              pre head0
dummy -> -1 -> 3 -> 5 -> 4 -> 0
              .
              .
              pre head0
dummy -> -1 -> 3 -> 5 -> 4 -> 0
              .
              .
         pre           head0
dummy -> -1 -> 3 -> 4 -> 5 -> 0
              .
              .
                            head0
dummy -> -1 -> 0 -> 3 -> 4 -> 5
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
var insertionSortList = function(head) {
  const dummy = new ListNode(0)
  dummy.next = head
  let head0 = dummy.next

  while (head0 && head0.next) {
    if (head0.next.val >= head0.val) {
      head0 = head0.next
      continue
    }

    let pre = dummy
    while (pre.next.val < head0.next.val) { pre = pre.next }

    let next = head0.next
    head0.next = next.next
    next.next = pre.next
    pre.next = next
  }

  return dummy.next
}
```

### 姊妹题

148

![](http://with.muyunyun.cn/d0cee500a18a46b76ed67016484973e2.jpg)
