### title

Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

Note:

The solution set must not contain duplicate quadruplets.

Example:

```js
Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

A solution set is:
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

### Analyze

题目 [15](https://github.com/MuYunyun/blog/blob/master/BasicSkill/LeetCode/15.3Sum/README.md) 的加强版, 唯一区别是定义的指针数量增加了, 仍然需要注意`解的去重`。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  const result = []
  if (nums.length < 4) return result
  const sortSum = nums.sort((n1, n2) => n1 - n2)
  const length = sortSum.length
  for (let i = 0; i < length - 3; i++) {
    if (i === 0 || nums[i] > nums[i - 1]) {
      let l = i + 1
      let m = l + 1
      while (l < length - 2) {
        let r = length - 1
        if (l === i + 1 || nums[l] > nums[l - 1]) {
          while (m < length - 1 && m < r) {
            let tmpArr = []
            const sum = nums[i] + nums[l] + nums[m] + nums[r]
            if (sum === target) {
              tmpArr.push(nums[i])
              tmpArr.push(nums[l])
              tmpArr.push(nums[m])
              tmpArr.push(nums[r])
              result.push(tmpArr)
              m++
              r--
              while (nums[m] === nums[m - 1]) {
                m++
              }
              while (nums[r] === nums[r + 1]) {
                r--
              }
            } else if (sum < target) {
              m++
            } else if (sum > target) {
              r--
            }
          }
        }
        l++
        m = l + 1
      }
    }
  }
  return result
}

fourSum([1, 0, -1, 0, -2, 2], 0)
```

![](http://with.muyunyun.cn/9e8e7033246cfea3940af4fb03b3a363.jpg-400)

假设数组的长度为 n, 算法复杂度估计为 `(n - 3) * (等差数列)` 即为 O(n^2)

### Sister Title

15、16