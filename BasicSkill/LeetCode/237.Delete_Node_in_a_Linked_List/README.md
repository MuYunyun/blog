### Delete Node in a Linked List

Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.

Example 1:

```js
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
```

Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.

Example 2:

```js
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
```

Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.

Note:

* The linked list will have `at least two elements`.
* All of the nodes' values will be unique.
* The given node will `not be the tail` and it will always be a valid node of the linked list.
* `Do not return anything from your function`.

### Analyze

相较于 [203.Remove_Linked_List_Elements](https://github.com/MuYunyun/blog/blob/master/BasicSkill/LeetCode/203.Remove_Linked_List_Elements/README.md), 此题一个点是在函数中不能返回任何值, 因此不能引入 dummyHead。另外一个点是没有传入 head 指针, 所以没法拿到当前要删除的上个节点。

```js
4 -> 5 -> 1 -> 9 -> null
          .
          .
          node
4 -> 5 -> 9 -> 9 -> null
          .
          .
4 -> 5 -> 9 -> null
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
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next
}
```

### 姊妹题

203