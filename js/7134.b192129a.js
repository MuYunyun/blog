(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7134],{37134:(n,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>m});var t=r(59713),u=r.n(t),o=r(6479),l=r.n(o),s=(r(67294),r(3905));function a(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function c(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){u()(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}var p={};function m(n){var e=n.components,r=l()(n,["components"]);return(0,s.kt)("wrapper",c(c(c({},p),r),{},{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h3",null,"title"),(0,s.kt)("p",null,"给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。"),(0,s.kt)("p",null,"请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。"),(0,s.kt)("p",null,"你可以假设 nums1 和 nums2 均不为空。"),(0,s.kt)("h3",null,"Analyze"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function (nums1, nums2) {\n  let arr = nums1.concat(nums2).sort((r1, r2) => r1 - r2)\n  const length = arr.length\n  if (length % 2 === 0) {\n    return (arr[length / 2 - 1] + arr[length / 2]) / 2\n  } else {\n    return arr[(length + 1) / 2 - 1]\n  }\n}\n")))}m.isMDXComponent=!0}}]);