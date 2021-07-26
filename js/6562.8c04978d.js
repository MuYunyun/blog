(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6562],{46562:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>p});var r=t(59713),l=t.n(r),o=t(6479),a=t.n(o),i=(t(67294),t(3905));function s(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?s(Object(t),!0).forEach((function(e){l()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var c={};function p(n){var e=n.components,t=a()(n,["components"]);return(0,i.kt)("wrapper",u(u(u({},c),t),{},{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h3",null,"title"),(0,i.kt)("p",null,"Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x."),(0,i.kt)("p",null,"You should preserve the original relative order of the nodes in each of the two partitions."),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",u({parentName:"pre"},{className:"language-js"}),"Input: head = 1->4->3->2->5->2, x = 3\nOutput: 1->2->2->4->3->5\n")),(0,i.kt)("h3",null,"Analyze"),(0,i.kt)("p",null,"思路: 遍历访问链表 head, 将链表中小于 x 与大于等于 x 的值作拆分成两个链表, 最后再将它们给链接起来。"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"易漏点: 大于等于 x 的链表的末尾的 next 应该指向 null。")),(0,i.kt)("pre",null,(0,i.kt)("code",u({parentName:"pre"},{className:"language-js"}),"/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} x\n * @return {ListNode}\n */\nvar partition = function(head, x) {\n  const listNode = new ListNode(0)\n  listNode.next = head\n\n  const smallerThanX = new ListNode(0)\n  const biggerThanX = new ListNode(0)\n\n  let cur = listNode.next\n  let smallPoint = smallerThanX\n  let bigPoint = biggerThanX\n  while (cur) {\n    if (cur.val < x) {\n      smallPoint.next = cur\n      smallPoint = smallPoint.next\n    } else {\n      bigPoint.next = cur\n      bigPoint = bigPoint.next\n    }\n\n    cur = cur.next\n  }\n\n  bigPoint.next = null\n  smallPoint.next = biggerThanX.next\n\n  return smallerThanX.next\n}\n")))}p.isMDXComponent=!0}}]);