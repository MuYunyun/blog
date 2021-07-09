(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2155],{2155:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>c});var a=t(59713),r=t.n(a),l=t(6479),i=t.n(l),p=(t(67294),t(3905));function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var s={};function c(e){var n=e.components,t=i()(e,["components"]);return(0,p.kt)("wrapper",u(u(u({},s),t),{},{components:n,mdxType:"MDXLayout"}),(0,p.kt)("h3",null,"Heap"),(0,p.kt)("p",null,"堆是通过一维数组来实现的树结构。"),(0,p.kt)("h3",null,"堆节点的访问"),(0,p.kt)("p",null,"在数组起始位置为 0 的情形中:"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"父节点 i 的左子节点在位置 ",(0,p.kt)("inlineCode",{parentName:"li"},"(2i + 1)"),";"),(0,p.kt)("li",{parentName:"ul"},"父节点 i 的右子节点在位置 ",(0,p.kt)("inlineCode",{parentName:"li"},"(2i + 2)"),";"),(0,p.kt)("li",{parentName:"ul"},"子节点 i 的父节点在位置 ",(0,p.kt)("inlineCode",{parentName:"li"},"Math.floor((i - 1) / 2)"),";")),(0,p.kt)("h3",null,"Max Heap && Min Heap"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"Max Heap"),": 每个节点都",(0,p.kt)("inlineCode",{parentName:"li"},"大于等于左右子节点"),"的值。用于",(0,p.kt)("inlineCode",{parentName:"li"},"升序排序"),"。见 ",(0,p.kt)("a",u({parentName:"li"},{href:"https://github.com/MuYunyun/blog/blob/master/Algorithm/algorithm/sort/heap_sort.md"}),"heap_sort"))),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"           8\n        ↙     ↘\n     3          7\n  ↙    ↘      ↙   ↘\n2        1  5        4\n")),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"Min Heap"),": 每个节点都",(0,p.kt)("inlineCode",{parentName:"li"},"小于等于左右子节点"),"的值。用于",(0,p.kt)("inlineCode",{parentName:"li"},"降序排序"),"。")),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"          1\n        ↙    ↘\n      2        4\n   ↙    ↘    ↙   ↘\n  5       3 8      7\n")),(0,p.kt)("h3",null,"Priority Queue Based Heap"),(0,p.kt)("p",null,"It's usually to use the two ways called enqueue and dequeue:"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"enqueue(value)"),": insert value into the heap;",(0,p.kt)("ul",{parentName:"li"},(0,p.kt)("li",{parentName:"ul"},"Because the value is inserted into the last heap, we'll use ",(0,p.kt)("inlineCode",{parentName:"li"},"sift up")," to adjust position;")))),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"           10\n        ↙     ↘\n     3          7\n           |\n           ↓\n      `enqueue(9)`\n           10\n        ↙     ↘\n     3          7\n  ↙ sift up\n9\n           |\n           ↓\n           10\n        ↙     ↘\n     9          7\n  ↙ sift up\n3\n")),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"dequeue()"),": to pick the smallest or the biggest element from the heap;",(0,p.kt)("ul",{parentName:"li"},(0,p.kt)("li",{parentName:"ul"},"It'll swap the endest element with the first element, and then keep the heap length reduce 1. If so, only do once ",(0,p.kt)("inlineCode",{parentName:"li"},"sift down")," operation in the first element to heapify.")))),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"           8\n        ↙     ↘\n     3          7\n  ↙    ↘      ↙   ↘\n2        1  5       4\n          |\n  pick 8, move 4 to top\n          ↓\n\n           4\n        ↙     ↘ (swap)\n     3          7\n  ↙    ↘      ↙\n2        1  5\n          |\n  sift down 4 to rebuild max heap.\n          ↓\n\n           7\n        ↙     ↘\n     3          4\n  ↙    ↘      ↙\n2        1  5\n          |\n  redo the last steps\n          ↓\n           7\n        ↙     ↘\n     3          5\n  ↙    ↘      ↙\n2        1  4\n")),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"var len\n\n/**\n * to build max heapify from bottom to top;\n * the last subscript's parent subscript is Math.floor((len - 1) / 2)\n */\nvar buildMaxHeapify = function(arr) {\n  len = arr.length\n\n  for (let i = Math.floor((len - 1) / 2); i >= 0; i--) {\n    siftDown(arr, i)\n  }\n  return arr\n}\n\n/**\n * Insert a value into heap. It's an operation called sift up.\n */\nvar enqueue = function(arr, value) {\n  arr.splice(len, 0, value)\n  len++\n  siftUp()\n}\n\n/**\n * to keep max heap, it's an operation called sift up.\n */\nvar siftUp = function() {\n  let enqueueValSubscript = len - 1\n  let parent = Math.floor(enqueueValSubscript / 2)\n  while (parent > 0 && arr[parent] < arr[enqueueValSubscript]) {\n    swap(arr, parent, enqueueValSubscript)\n    enqueueValSubscript = parent\n    parent = Math.floor(enqueueValSubscript / 2)\n  }\n}\n\n/*\n * to pick the smallest or the biggest element from the heap and return it;\n * Then t'll swap the endest element with the first element, and then keep the\n * heap length reduce one. If so, only do once sift down operation in the first element to keep heapify.\n */\nvar dequeue = function() {\n  const maxValue = arr[0]\n  swap(arr, len - 1, 0)\n  len--\n  siftDown(arr, 0)\n  return maxValue\n}\n\n/**\n * to keep max heap, it's an operation called sift down.\n */\nvar siftDown = function(arr, i) {\n  const left = 2 * i + 1\n  const right = 2 * i + 2\n  let maxSubscript = i\n\n  if (left < len && arr[left] > arr[maxSubscript]) {\n    maxSubscript = left\n  }\n\n  if (right < len && arr[right] > arr[maxSubscript]) {\n    maxSubscript = right\n  }\n\n  if (maxSubscript !== i) {\n    swap(arr, maxSubscript, i)\n    siftDown(arr, maxSubscript)\n  }\n}\n\n// swap two value in arr\nvar swap = function(arr, pointOne, pointTwo) {\n  const tmp = arr[pointOne]\n  arr[pointOne] = arr[pointTwo]\n  arr[pointTwo] = tmp\n}\n")),(0,p.kt)("p",null,"Test case one:"),(0,p.kt)("pre",null,(0,p.kt)("code",u({parentName:"pre"},{className:"language-js"}),"input: var arr = [5, 2, 7, 3, 1, 8, 4]\n\nbuildMaxHeapify(arr) // [8, 3, 7, 2, 1, 5, 4]\n           8                                           8\n        ↙     ↘          enqueue(arr, 6)            ↙     ↘\n     3          7        ---------------\x3e         6          7\n  ↙    ↘      ↙   ↘                            ↙    ↘      ↙   ↘\n2        1  5       4                        3        1   5       4\n                                           ↙\n                                         2\n\n                                     7\n        return 8                  ↙     ↘\n        dequeue()               6         5\n    ----------------\x3e        ↙    ↘     ↙   ↘\n                           3       1   2      4\n")))}c.isMDXComponent=!0}}]);