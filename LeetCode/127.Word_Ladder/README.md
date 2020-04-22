### 127.Word Ladder

Given two words (beginWord and endWord), and a dictionary's word list, find `the length of shortest transformation sequence` from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list.

Note:

* `Return 0` if there is no such transformation sequence.
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

题目解读: 比如 beginWord 字母 `hit` 可以转化变形为 `xit`、`hxt`、`hix` 三种形式字母, 如果此时转化后存在与 endWord 相等的字母, 则返回寻找到的 level。

```js
                                     level
                       hit             1
                    ↙   ↓   ↘
                  xit  hot  hix        2
                     ↙     ↘
                   dot     lot         3
                 ↙     ↘    ↓
               lot     dog log         4
                        ↓
                       cog             5
```

因此该题可以转化为求`图最短路径`的问题, 图最短路径运用到了`队列的思想`。

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

因为 BFS 是从左到右依次遍历的, 可以想象层级较深的节点需要更多的空间时间来进行搜索。这里引出了`双向 BFS` 算法, 它的思路如下:

* 一端从 beginWord 开始 BFS, 于此同时另一端从 endWord 也开始 BFS;
  * 用 beginLevel, endLevel 来分别记录它们访问到的层级;
  * beginLevel 与 endLevel 每次加一;
* 当两端聚拢到同一个节点时, 此时 beginLevel 与 endLevel 之和就为题解; 否则返回 0;

```js
                                     level
                       hit             1
                        ↓
                       hot             2
                     ↙     ↘
                   dot     lot         3
                 ↙     ↘    ↓
               lot     dog log         4
                        ↓
                       cog             5
```

```js
["hot","dot","dog","lot","log","cog"]
begin: hot dot
end: dog dot

ladderLength('hit', 'cog', ["hot","dot","dog","lot","log","cog"])

"lost"
"cost"
["most","fist","lost","cost","fish"]
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
  const beginQueue = []
  const endQueue = []

  const visitedBeginObj = {
    beginWord: true
  }
  const visitedEndObj = {
    endWord: true
  }
  beginQueue.push({ beginWord, beginLevel: 1 })
  endQueue.push({ endWord, endLevel: 1 })
  while (beginQueue.length > 0) {
    const { beginWord, beginLevel } = beginQueue.shift()
    const { endWord, endLevel } = endQueue.shift()
    for (let i = 0; i < wordList.length; i++) {
      const isDiffOneBeginWord = ifDiffOneWord(beginWord, wordList[i])
      const isDiffOneEndWord = ifDiffOneWord(endWord, wordList[i])
      if ((isDiffOneBeginWord && endWord === wordList[i])
      || (isDiffOneEndWord && beginWord === wordList[i])) {
        return beginLevel + endLevel
      }
      if (isDiffOneBeginWord && isDiffOneEndWord) {
        return beginLevel + endLevel + 1
      }
      if (isDiffOneBeginWord) {
        !visitedBeginObj[beginWord]
          && beginQueue.push({ beginWord: wordList[i], beginLevel: beginLevel + 1 })
        visitedBeginObj[beginWord] = true
      }
      if (isDiffOneEndWord) {
        !visitedEndObj[endWord]
          && endQueue.push({ endWord: wordList[i], endLevel: endLevel + 1 })
        visitedEndObj[endWord] = true
      }
    }
  }
  return 0
}

// judge if the targetWord has one different word from the comparedWord
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