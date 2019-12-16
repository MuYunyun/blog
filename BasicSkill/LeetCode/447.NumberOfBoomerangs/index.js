/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
  const map = new Map()

  // calculate the distance from x to y;
  const getDistance = (x, y) => {
    return Math.sqrt(Math.pow(y[0] - x[0]) + Math.pow(y[1] - x[1]))
  }
  for (let p = 0; p < points.length; p++) {
    for (let n = p + 1; n < points.length; n++) {
      const distance = getDistance(points[p], points[n])
      const mapGetValue = map.get(`point${p}distance${distance}`)
      if (mapGetValue) {
        map.set(`point${p}distance${distance}`, mapGetValue + 1)
      } else {
        map.set(`point${p}distance${distance}`, 1)
      }
    }
  }

  // get the result
  const analyzeSum = (n) => {
    let multiple = 1
    while(n >= 1) {
      multiple = multiple * n
      n--
    }
    return multiple
  }

  let result = 0
  map.forEach((value, key) => {
    if (value > 1) {
      const sum = analyzeSum(value)
      result += sum
    }
  })

  return result
};


执行结果：
解答错误
显示详情
输入:
[[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]
输出
32
预期结果
20