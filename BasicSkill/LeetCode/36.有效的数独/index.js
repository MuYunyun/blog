/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const set = new Set()
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const num = board[x][y]
      if (num !== '.') {
        if (set.has(`row ${x} ${num}`)
          || set.has(`col ${y} ${num}`)
          || set.has(`block ${Math.floor(x / 3)} ${Math.floor(y / 3)} ${num}`)
        ) {
          return false
        } else {
          set.add(`row ${x} ${num}`)
          set.add(`col ${y} ${num}`)
          set.add(`block ${Math.floor(x / 3)} ${Math.floor(y / 3)} ${num}`)
        }
      }
    }
  }
  return true
};