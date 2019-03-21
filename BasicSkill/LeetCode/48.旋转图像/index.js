/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  matrix.reverse()

  let tmp
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < x; y++) {
      tmp = matrix[x][y]
      matrix[x][y] = matrix[y][x]
      matrix[y][x] = tmp
    }
  }

  console.log(matrix)
};