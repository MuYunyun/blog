### 126. Word Ladder II

Given two words (beginWord and endWord), and a dictionary's word list, find `all shortest transformation` sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each transformed word must exist in the word list. Note `that beginWord is not a transformed word`.

Note:

* `Return an empty list` if there is no such transformation sequence.
* All words `have the same length`.
* All words `contain only lowercase alphabetic characters`.
* You may assume `no duplicates` in the word list.
* You may assume beginWord and endWord are `non-empty` and are `not the same`.

Example 1:

```js
Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
```

Example 2:

```js
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: []

// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
```

### Analyze

```js
24/39 测试用例

输入：
"red"
"tax"
["ted","tex","red","tax","tad","den","rex","pee"]
输出：
[["red","ted","tad","tax"],["red","ted","tex","tax"]]
预期：
[["red","ted","tad","tax"],["red","ted","tex","tax"],["red","rex","tex","tax"]]
```

```js
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
  const result = []
  if (wordList.indexOf(endWord) === -1) return result
  const queue = []
  const visitedObj = {
    beginWord: true
  }
  queue.push({ word: createNode(beginWord), level: 1 })
  let levelLimit = null
  debugger
  while (queue.length > 0) {
    const { word, level } = queue.shift()
    if (levelLimit && level >= levelLimit) return result
    if (visitedObj[word.val]) continue
    for (let i = 0; i < wordList.length; i++) {
      const isDiffOneWord = ifDiffOneWord(word.val, wordList[i])
      if (isDiffOneWord) {
        const newNode = createNode(wordList[i])
        newNode.parent = word
        if (wordList[i] === endWord) {
          result.push(convertTreeToArr(newNode, beginWord))
          levelLimit = level + 1
        }
        queue.push({ word: newNode, level: level + 1 })
        visitedObj[word.val] = true
      }
    }
  }
  return result
}

// judge if the targetWord has one different word from the comparedWord;
function ifDiffOneWord(targetWord, comparedWord) {
  let wordLength = targetWord.length
  let diffNum = 0
  for (let i = 0; i < wordLength; i++) {
    if (targetWord[i] !== comparedWord[i]) {
      diffNum++
    }
    if (diffNum > 1) return false
  }
  if (diffNum === 1) {
    return true
  } else {
    return false
  }
}

/**
 * create new Node
 */
function createNode(val) {
  return {
    val,
    parent: null
  }
}

/**
 * convert tree to arr
 */
function convertTreeToArr(tree, beginWord) {
  const result = []
  while (tree.parent) {
    result.unshift(tree.val)
    tree = tree.parent
  }
  result.unshift(beginWord)
  return result
}
```

### Similar Title

279、127、126