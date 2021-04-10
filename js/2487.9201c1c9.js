(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2487],{12487:n=>{n.exports='### 90.Decode Ways\n\nA message containing letters from A-Z can be encoded into numbers using the following mapping:\n\n```js\n\'A\' -> "1"\n\'B\' -> "2"\n...\n\'Z\' -> "26"\n```\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:\n\n* "AAJF" with the grouping (1 1 10 6)\n* "KJF" with the grouping (11 10 6)\n\nNote that the grouping (1 11 06) is invalid because `"06" cannot be mapped into \'F\' since "6" is different from "06"`.\n\nGiven a string s containing only digits, return the number of ways to decode it.\n\nThe answer is guaranteed to fit in a 32-bit integer.\n\nExample 1:\n\n```js\nInput: s = "12"\nOutput: 2\nExplanation: "12" could be decoded as "AB" (1 2) or "L" (12).\n```\n\nExample 2:\n\n```js\nInput: s = "226"\nOutput: 3\nExplanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).\n```\n\nExample 3:\n\n```js\nInput: s = "0"\nOutput: 0\nExplanation: There is no character that is mapped to a number starting with 0.\nThe only valid mappings with 0 are \'J\' -> "10" and \'T\' -> "20", neither of which start with 0.\nHence, there are no valid ways to decode this since all digits need to be mapped.\n```\n\nExample 4:\n\n```js\nInput: s = "06"\nOutput: 0\nExplanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").\n```\n\nConstraints:\n\n* 1 <= s.length <= 100\n* s contains only digits and may contain leading zero(s).\n\n### Analyze\n\n* 567\n   * 5 6 7\n  * 56 不满足\n  * 5 67 不满足\n\n思路:\n\n* \'226\' 拆解\n  * 2 + \'26\' 的拆解之和\n  * 22 + \'6\' 的拆解之和\n\n```js\n/**\n * @param {string} s\n * @return {number}\n */\nvar numDecodings = function(s) {\n  return judge(s, 0)\n}\n\nvar judge = function(s, start) {\n  const length = s.length\n  if (start === s.length) {\n    return 0\n  }\n  let count = 0\n  if (s[start] && isValidValue(s[start])) {\n    count++\n  }\n  if (s[start + 1] && isValidValue(s.slice(start, start + 1))) {\n    count++\n  }\n\n  return count + judge(s, start + 1)\n}\n\nvar isValidValue = function(value) {\n  const valueToNum = Number(value)\n  return valueToNum !== 0\n    && (value.length === String(valueToNum).length)\n    && valueToNum <= 26\n}\n```'}}]);