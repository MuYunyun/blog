(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6986],{46986:(n,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>m});var r=e(59713),l=e.n(r),p=e(6479),a=e.n(p),o=(e(67294),e(3905));function u(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function c(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?u(Object(e),!0).forEach((function(t){l()(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):u(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var i={};function m(n){var t=n.components,e=a()(n,["components"]);return(0,o.kt)("wrapper",c(c(c({},i),e),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"title"),(0,o.kt)("p",null,"给定一个 n × n 的二维矩阵表示一个图像。"),(0,o.kt)("p",null,"将图像顺时针旋转 90 度。"),(0,o.kt)("p",null,"说明:"),(0,o.kt)("p",null,"你必须在原地旋转图像, 这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。"),(0,o.kt)("p",null,"示例 1:"),(0,o.kt)("pre",null,(0,o.kt)("code",c({parentName:"pre"},{}),"给定 matrix =\n[\n  [1,2,3],\n  [4,5,6],\n  [7,8,9]\n],\n\n原地旋转输入矩阵, 使其变为:\n[\n  [7,4,1],\n  [8,5,2],\n  [9,6,3]\n]\n")),(0,o.kt)("p",null,"示例 2:"),(0,o.kt)("pre",null,(0,o.kt)("code",c({parentName:"pre"},{}),"给定 matrix =\n[\n  [ 5, 1, 9,11],\n  [ 2, 4, 8,10],\n  [13, 3, 6, 7],\n  [15,14,12,16]\n],\n\n原地旋转输入矩阵, 使其变为:\n[\n  [15,13, 2, 5],\n  [14, 3, 4, 1],\n  [12, 6, 8, 9],\n  [16, 7,10,11]\n]\n")),(0,o.kt)("h3",null,"analyze"),(0,o.kt)("p",null,"这类题目可以采用如下思路:"),(0,o.kt)("p",null,"1.matrix.reverse(), 得"),(0,o.kt)("pre",null,(0,o.kt)("code",c({parentName:"pre"},{}),"[\n  [15,13, 2, 5],\n  [14, 3, 4, 1],\n  [12, 6, 8, 9],\n  [16, 7,10,11]\n]\n")),(0,o.kt)("p",null,"2.然后以左上角到右下角的线作为翻转线进行翻转, 这里找规律"),(0,o.kt)("pre",null,(0,o.kt)("code",c({parentName:"pre"},{}),"1 2 3\n4 5 6  只需对  4   进行处理\n7 8 9         7 8\n")),(0,o.kt)("pre",null,(0,o.kt)("code",c({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar rotate = function (matrix) {\n  matrix.reverse()\n\n  let tmp\n  for (let x = 0; x < matrix.length; x++) {\n    for (let y = 0; y < x; y++) {\n      tmp = matrix[x][y]\n      matrix[x][y] = matrix[y][x]\n      matrix[y][x] = tmp\n    }\n  }\n\n  console.log(matrix)\n};\n")))}m.isMDXComponent=!0}}]);