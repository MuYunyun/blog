### title

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

```js
Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### 解题

相关思路:

1. 排序;
2. 查找表;
3. 双指针;

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const sortNums = nums.sort((r1, r2) => r1 - r2)
  let targetValue
  const cacheMap = new Map()
  const result = []

  for (let i = 0; i < sortNums.length - 2; i++) {
    targetValue = -sortNums[i]
    let l = i + 1
    let r = sortNums.length - 1

    while (l < r) {
      let tmpArr = []
      const mapValue = cacheMap.get(`${-targetValue}${sortNums[l]}${sortNums[r]}`)
      if (sortNums[l] + sortNums[r] === targetValue && !mapValue) {
        tmpArr.push(-targetValue)
        tmpArr.push(sortNums[l])
        tmpArr.push(sortNums[r])
        result.push(tmpArr)
        cacheMap.set(`${-targetValue}${sortNums[l]}${sortNums[r]}`, true)
        l++
        r--
      } else if (sortNums[l] + sortNums[r] === targetValue && mapValue) {
        l++
      }else if (sortNums[l] + sortNums[r] > targetValue) {
        r--
      }else if (sortNums[l] + sortNums[r] < targetValue) {
        l++
      }
    }
  }

  return result
}
```

此时通过测试用例的情况为 312/313, 差一个包含 3000 个 0 数组的测试用例没通过; 根据评论区的提示, 缺少了`对相应下标的值去重`这个步骤(这个是这道题卡主大部分人的原因), 优化如下:

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const sortNums = nums.sort((r1, r2) => r1 - r2)
  let targetValue
  const result = []

  for (let i = 0; i < sortNums.length - 2; i++) {
    // 针对下标 i 对应的值进行去重
    if (i === 0 || nums[i] > nums[i - 1]) {
      targetValue = -sortNums[i]
      let l = i + 1
      let r = sortNums.length - 1

      while (l < r) {
        let tmpArr = []
        if (sortNums[l] + sortNums[r] === targetValue) {
          tmpArr.push(-targetValue)
          tmpArr.push(sortNums[l])
          tmpArr.push(sortNums[r])
          result.push(tmpArr)
          l++
          r--
          // 针对下标 l 对应的值进行去重, r 同理
          while (l < r && sortNums[l] === sortNums[l - 1]) {
            l++
          }
          while (l < r && sortNums[r] === sortNums[r + 1]) {
            r--
          }
        } else if (sortNums[l] + sortNums[r] > targetValue) {
          r--
        } else if (sortNums[l] + sortNums[r] < targetValue) {
          l++
        }
      }
    }
  }

  return result
}
```

![](http://with.muyunyun.cn/10dda8915d98182962f44344244e8b5a.jpg-400)


