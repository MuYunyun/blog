(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8017],{68017:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>p});var r=t(59713),o=t.n(r),i=t(6479),l=t.n(i),a=(t(67294),t(3905));function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){o()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u={};function p(e){var n=e.components,t=l()(e,["components"]);return(0,a.kt)("wrapper",s(s(s({},u),t),{},{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h3",null,"126. Word Ladder II"),(0,a.kt)("p",null,"Given two words (beginWord and endWord), and a dictionary's word list, find ",(0,a.kt)("inlineCode",{parentName:"p"},"all shortest transformation")," sequence(s) from beginWord to endWord, such that:"),(0,a.kt)("p",null,"Only one letter can be changed at a time\nEach transformed word must exist in the word list. Note ",(0,a.kt)("inlineCode",{parentName:"p"},"that beginWord is not a transformed word"),"."),(0,a.kt)("p",null,"Note:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Return an empty list")," if there is no such transformation sequence."),(0,a.kt)("li",{parentName:"ul"},"All words ",(0,a.kt)("inlineCode",{parentName:"li"},"have the same length"),"."),(0,a.kt)("li",{parentName:"ul"},"All words ",(0,a.kt)("inlineCode",{parentName:"li"},"contain only lowercase alphabetic characters"),"."),(0,a.kt)("li",{parentName:"ul"},"You may assume ",(0,a.kt)("inlineCode",{parentName:"li"},"no duplicates")," in the word list."),(0,a.kt)("li",{parentName:"ul"},"You may assume beginWord and endWord are ",(0,a.kt)("inlineCode",{parentName:"li"},"non-empty")," and are ",(0,a.kt)("inlineCode",{parentName:"li"},"not the same"),".")),(0,a.kt)("p",null,"Example 1:"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input:\nbeginWord = "hit",\nendWord = "cog",\nwordList = ["hot","dot","dog","lot","log","cog"]\n\nOutput:\n[\n  ["hit","hot","dot","dog","cog"],\n  ["hit","hot","lot","log","cog"]\n]\n')),(0,a.kt)("p",null,"Example 2:"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input:\nbeginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log"]\n\nOutput: []\n\n// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.\n')),(0,a.kt)("h3",null,"Analyze"),(0,a.kt)("p",null,"暂时跳过此题, 目前卡在 21/39 测试用例中, 超过时间限制;"),(0,a.kt)("pre",null,(0,a.kt)("code",s({parentName:"pre"},{className:"language-js"}),"/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {string[][]}\n */\nvar findLadders = function(beginWord, endWord, wordList) {\n  const result = []\n  if (wordList.indexOf(endWord) === -1) return result\n  const queue = []\n  const visitedObj = {\n    beginWord: {\n      visited: true,\n      visitedParent: null\n    }\n  }\n  queue.push({ word: createNode(beginWord), level: 1 })\n  let levelLimit = null\n  while (queue.length > 0) {\n    const { word, level } = queue.shift()\n    if (levelLimit && level >= levelLimit) return result\n    // if the value and it's parent value are visited, jump this loop;\n    if (visitedObj[word.val] && visitedObj[word.val].visited\n    && word.parent === visitedObj[word.val].visitedParent) continue\n    for (let i = 0; i < wordList.length; i++) {\n      const isDiffOneWord = ifDiffOneWord(word.val, wordList[i])\n      if (isDiffOneWord) {\n        const newNode = createNode(wordList[i])\n        newNode.parent = word\n        if (wordList[i] === endWord) {\n          result.push(convertTreeToArr(newNode, beginWord))\n          levelLimit = level + 1\n        }\n        queue.push({ word: newNode, level: level + 1 })\n        visitedObj[word.val] = {\n          visited: true,\n          visitedParent: word\n        }\n      }\n    }\n  }\n  return result\n}\n\n// judge if the targetWord has one different word from the comparedWord;\nfunction ifDiffOneWord(targetWord, comparedWord) {\n  let wordLength = targetWord.length\n  let diffNum = 0\n  for (let i = 0; i < wordLength; i++) {\n    if (targetWord[i] !== comparedWord[i]) {\n      diffNum++\n    }\n    if (diffNum > 1) return false\n  }\n  if (diffNum === 1) {\n    return true\n  } else {\n    return false\n  }\n}\n\n/**\n * create new Node\n */\nfunction createNode(val) {\n  return {\n    val,\n    parent: null\n  }\n}\n\n/**\n * convert tree to arr\n */\nfunction convertTreeToArr(tree, beginWord) {\n  const result = []\n  while (tree.parent) {\n    result.unshift(tree.val)\n    tree = tree.parent\n  }\n  result.unshift(beginWord)\n  return result\n}\n")),(0,a.kt)("h3",null,"Similar Title"),(0,a.kt)("p",null,"279、127、126"))}p.isMDXComponent=!0}}]);