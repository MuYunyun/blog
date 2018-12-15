/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const sortNums = nums.sort((r1, r2) => r1 - r2)
  let targetValue
  let x
  let y
  const cacheObj = {}
  const result = []

  for (let i = 0; i < sortNums.length - 2; i++) {
    targetValue = -sortNums[i]
    x = i + 1
    y = sortNums.length - 1
    while (x < y) {
      let tmpArr = []
      if (sortNums[x] + sortNums[y] === targetValue && !cacheObj[`${-targetValue}${sortNums[x]}${sortNums[y]}`]) {
        tmpArr.push(-targetValue)
        tmpArr.push(sortNums[x])
        tmpArr.push(sortNums[y])
        result.push(tmpArr)
        cacheObj[`${-targetValue}${sortNums[x]}${sortNums[y]}`] = true
        x++
        y--
        continue
      } else if (sortNums[x] + sortNums[y] === targetValue && cacheObj[`${-targetValue}${sortNums[x]}${sortNums[y]}`]) {
        x++
        continue
      }

      if (sortNums[x] + sortNums[y] > targetValue) {
        y--
        continue
      }

      if (sortNums[x] + sortNums[y] < targetValue) {
        x++
        continue
      }
    }
  }

  return result
};
