(self.webpackChunkblog=self.webpackChunkblog||[]).push([[1499],{21499:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>c});var r=t(59713),l=t.n(r),o=t(6479),u=t.n(o),a=(t(67294),t(3905));function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){l()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var i={};function c(e){var n=e.components,t=u()(e,["components"]);return(0,a.kt)("wrapper",s(s(s({},i),t),{},{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h3",null,"title"),(0,a.kt)("p",null,"Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes."),(0,a.kt)("p",null,"You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity."),(0,a.kt)("p",null,"Example 1:"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: 1->2->3->4->5->NULL\nOutput: 1->3->5->2->4->NULL\n")),(0,a.kt)("p",null,"Example 2:"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: 2->1->3->5->6->4->7->NULL\nOutput: 2->3->6->7->1->5->4->NULL\n")),(0,a.kt)("p",null,"Note:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The relative order inside both the even and odd groups should remain as it was in the input;"),(0,a.kt)("li",{parentName:"ul"},"The first node is considered odd, the second node even and so on;")),(0,a.kt)("h3",null,"Analyze"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),"       cur    next\nInput:  1  ->  2  ->  3  ->  4  ->  5  ->  NULL\n       prev   cur    next\n        1  ->  2  ->  3  ->  4  ->  5  ->  NULL\n                      .\n                      .\n                            prev   cur    next  遍历完成后, 如果此时是奇数位则将 cur 的指针指向偶数列表。\n        1  ->  2  ->  3  ->  4  ->  5  ->  NULL\n\n\nOutput: 1  ->  3  ->  5  ->  2  ->  4  ->  NULL\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"将 prev 的 next 指向 next;"),(0,a.kt)("li",{parentName:"ul"},"如何将奇数链表与偶数链表进行链接(末尾的链表可能为奇数位也可能为偶数位)?")),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),"/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar oddEvenList = function(head) {\n  if (!head) return head\n  const list = new ListNode(0)\n  list.next = head\n  const odd = list.next\n  const even = odd.next\n\n  let prev = null\n  let cur = list.next\n  let next = cur.next\n  let count = 1\n\n  while (next) {\n    prev && (prev.next = next)\n    prev = cur\n    cur = next\n    next = cur.next\n    count++\n  }\n\n  if (count % 2 === 1) {\n    prev && (prev.next = null)\n    cur.next = even\n  } else {\n    prev.next = even\n  }\n\n  return odd\n}\n")))}c.isMDXComponent=!0}}]);