### 4Sum II

Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.

To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -2^28 to 2^28 - 1 and the result is guaranteed to be at most 2^31 - 1.

Example:

```js
Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

Output:
2

Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

### Analyze

解题思路: 如果正常暴力解法为 n^4, n^3 在 0 <= N <= 500 的数量级下已经达到 `125000000`, 根据[算法复杂度](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/算法复杂度.md) 里对数量与时间的统计, 算法的数据复杂度理应不超过 n^2。

因此我们将 C 与 D 和出现的次数存进查找表中, 从而优化算法复杂度(查找表的关键是确认存进查找表的 key 和 value 是多少)。

```js
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
  const tmpMap = new Map()
  for (let ic = 0; ic < C.length; ic++) {
    for (let id = 0; id < D.length; id++) {
      const sumC_D = C[ic] + D[id]
      const hasSumC_D = tmpMap.has(sumC_D)
      if (hasSumC_D) {
        tmpMap.set(sumC_D, tmpMap.get(sumC_D) + 1)
      } else {
        tmpMap.set(sumC_D, 1)
      }
    }
  }

  let count = 0

  for (let ia = 0; ia < A.length; ia++) {
    for (let ib = 0; ib < B.length; ib++) {
      const sumA_B = A[ia] + B[ib]
      tmpMap.has(-sumA_B) && (count = count + tmpMap.get(-sumA_B))
    }
  }

  return count
}
```

![](http://with.muyunyun.cn/a10b03c6f22d312f32b4f0a7f2795f4f.jpg)

### Sister Title

18(题目相似, 但是因为传入参数不同导致解法不同)