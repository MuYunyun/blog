(self.webpackChunkblog=self.webpackChunkblog||[]).push([[914],{40914:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>s});var l=t(59713),r=t.n(l),u=t(6479),o=t.n(u),a=(t(67294),t(3905));function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,l)}return t}function p(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){r()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var m={};function s(n){var e=n.components,t=o()(n,["components"]);return(0,a.kt)("wrapper",p(p(p({},m),t),{},{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h3",null,"Remove Nth Node From End of List"),(0,a.kt)("p",null,"Given a linked list, remove the n-th node from the end of list and return its head."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("p",null,"Given linked list: 1->2->3->4->5, and n = 2."),(0,a.kt)("p",null,"After removing the second node from the end, the linked list becomes 1->2->3->5."),(0,a.kt)("p",null,"Note:"),(0,a.kt)("p",null,"Given n will always be ",(0,a.kt)("inlineCode",{parentName:"p"},"valid"),"."),(0,a.kt)("p",null,"Follow up:"),(0,a.kt)("p",null,"Could you do this ",(0,a.kt)("inlineCode",{parentName:"p"},"in one pass"),"?"),(0,a.kt)("h3",null,"Analyze"),(0,a.kt)("p",null,"对于删除链表节点的题目, 我们需要知道需删除链表节点的上一个节点。那如何找到需要删除节点的上一个节点呢?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"思路一: 遍历一遍链表得到链表个数 sum, 再次遍历链表则 ",(0,a.kt)("inlineCode",{parentName:"li"},"sum - n - 1")," 表示从正向数过来需删除的链表节点的上一个节点的位数;",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"缺点: 这样需要两次遍历;"))),(0,a.kt)("li",{parentName:"ul"},"思路二: 使用双指针的思想确认要删除的节点;")),(0,a.kt)("p",null,"此外从题目的例子可以得到的线索:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"n 是从 1 开始的(不是从 0 开始);")),(0,a.kt)("pre",null,(0,a.kt)("code",p({parentName:"pre"},{className:"language-js"}),"1 -> 2 -> 3 -> 4 -> 5 -> null\n                .\n                .\n第一步: l 与 r 的距离为 n + 1;\n  l                r\ndummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null\n                .\n                .\n第二步: 始终保持 l 与 r 的距离为 n + 1, 向右移动, 直到 r 为 null, 此时 l 的位置就是要删除节点上一个的位置。\n                   l               r\ndummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null\n")),(0,a.kt)("pre",null,(0,a.kt)("code",p({parentName:"pre"},{className:"language-js"}),"/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} n\n * @return {ListNode}\n */\nvar removeNthFromEnd = function(head, n) {\n  const dummy = new ListNode(0)\n  dummy.next = head\n  let l = dummy\n  let r = dummy\n  let offset = n + 1\n\n  while (offset--) {\n    r = r.next\n    if (offset > 1 && r === null) {\n      return dummy.next\n    }\n  }\n\n  while (r) {\n    r = r.next\n    l = l.next\n  }\n\n  l.next = l.next.next\n\n  return dummy.next\n}\n")),(0,a.kt)("p",null,(0,a.kt)("img",p({parentName:"p"},{src:"http://with.muyunyun.cn/8a3c94502a50892aba7f4697487bde32.jpg",alt:null}))),(0,a.kt)("h3",null,"Sister Title"),(0,a.kt)("p",null,"61"))}s.isMDXComponent=!0}}]);