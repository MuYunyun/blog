/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const cache = {}
  return findMinCount(m - 1, n - 1, grid, cache)
}

function findMinCount(x, y, grid, cache) {
  if (cache[`${x}~${y}`]) {
    if (x === 17) {
      var test = null
    }
    return cache[`${x}~${y}`]
  }

  let count = 0

  if (x === 0 && y === 0) {
    count = grid[0][0]
  } else if (x === 0) {
    count = findMinCount(0, y - 1, grid, cache) + grid[0][y]
  } else if (y === 0) {
    count = findMinCount(x - 1, y, grid, cache) + grid[x][0]
  }

  if (x > 0 && y > 0) {
    count = Math.min(findMinCount(x - 1, y, grid, cache), findMinCount(x, y - 1, grid, cache)) + grid[x][y]
  }

  cache[`${x}~${y}`] = count

  return count
}