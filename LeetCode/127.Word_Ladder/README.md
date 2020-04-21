### 127.Word Ladder

Given two words (beginWord and endWord), and a dictionary's word list, find `the length of shortest transformation sequence` from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list.

Note:

* `Return 0` if there is no such transformation sequence.
* All words `have the same length`.
* All words `contain only lowercase alphabetic characters`.
* You may assume `no duplicates` in the word list.
* You may assume beginWord and endWord are non-empty and are not the same.

Example 1:

```js
Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

// Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.
```

Example 2:

```js
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
```

### Analyze

建模: 题目可以转化为求`图最短路径`的问题, 图最短路径运用到了`队列的思想`。

比如 beginWord 字母 `hit` 可以转化变形为 `xit`、`hxt`、`hix` 三个字母, 如果此时转化的这三个字母中有字母与 endWord 相等, 则返回寻找 level 1;

```js
                      level
        hit             0
     ↙   ↓   ↘
   xit  hxt  hix        1
```

```js
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) === -1) return 0
  const queue = []
  const visitedObj = {
    beginWord: true
  }
  queue.push({ word: beginWord, level: 1 })
  while (queue.length > 0) {
    const { word, level } = queue.shift()

    if (visitedObj[word]) continue
    for (let i = 0; i < wordList.length; i++) {
      const isDiffOneWord = ifDiffOneWord(word, wordList[i])
      if (isDiffOneWord) {
        if (wordList[i] === endWord) {
          return level + 1
        }
        queue.push({ word: wordList[i], level: level + 1 })
        visitedObj[word] = true
      }
    }
  }
  return 0
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
```

![](http://with.muyunyun.cn/6a2cb2b81d139ee676a1be7634551fb1.jpg)

此时虽然 ac 了该题, 但执行耗时有些慢, 🤔有没有优化空间呢?

因为 BFS 是从左到右依次遍历的, 可以想象层级较深的节点需要更多的空间时间来进行搜索。题解中提到了双向 BFS, 它的含义是一端从 beginWord 开始搜索, 一端从 endWord 开始搜索。