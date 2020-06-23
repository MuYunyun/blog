### 347.Top K Frequent Elements

Given a non-empty array of integers, return the k most frequent elements.

```js
Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

Example 2:

```js
Input: nums = [1], k = 1
Output: [1]
```

Note:

* You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
* Your algorithm's `time complexity must be better than O(n log n)`, where n is the array's size.
* It's guaranteed that `the answer is unique`, in other words the set of the top k frequent elements is unique.
* You can return the answer in any order.

### Analyze

思路一:

1. 将各个元素出现的频率统计进哈希表中;
2. 然后对出现频率进行排序;
3. 取频率排前 k 的元素;

这样的时间复杂度为 O(nlog n) 级别。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  const obj = {}
  for (let i = 0; i < nums.length; i++) {
    if (!obj[nums[i]]) {
      obj[nums[i]] = 1
    } else {
      obj[nums[i]] = obj[nums[i]] + 1
    }
  }

  const list = []

  const keysArr = Object.keys(obj)
  for (let i = 0; i < keysArr.length; i++) {
    const key = keysArr[i]
    const value = obj[key]
    list.push({ key, value })
  }

  list.sort((r1, r2) => r2.value - r1.value)
  const result = []
  list.map((obj, index) => {
    if (index < k) {
      result.push(parseInt(obj.key, 10))
    }
  })
  return result
}
```

该题解虽然可以 ac, 但是由于题目给出了时间复杂度需小于 `(n log n)` 这一限制, 因而我们思考其它方式🤔。

思路二: 桶排序分组的思想

1. 首先将各个元素出现的频率统计进哈希表中;
2. 将频率减去 1 后的值作为数组 list 的下标存入;
3. 从 list 中遍历取出频率最高的 k 个元素;

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  const obj = {}
  for (let i = 0; i < nums.length; i++) {
    if (!obj[nums[i]]) {
      obj[nums[i]] = 1
    } else {
      obj[nums[i]] = obj[nums[i]] + 1
    }
  }

  const list = []

  const keysArr = Object.keys(obj)
  for (let i = 0; i < keysArr.length; i++) {
    const key = keysArr[i]
    const value = obj[key]
    if (!list[value - 1]) {
      list[value - 1] = [parseInt(key, 10)]
    } else {
      list[value - 1].push(parseInt(key, 10))
    }
  }

  const result = []
  let count = 0
  for (let i = list.length - 1; i >= 0; i--) {
    const curList = list[i]
    if (curList) {
      for (let x = 0; x < curList.length; x++) {
        if (count === k) return result
        result.push(curList[x])
        count++
      }
    }
  }
  return result
}
```

![](http://with.muyunyun.cn/926ca1b564c07610790ab1e0e4cafa6f.jpg)