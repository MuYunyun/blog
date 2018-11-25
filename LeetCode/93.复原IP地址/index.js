/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const arr = []
  for (let i = 1; i < 4; i++) {
    for (let j = i + 1; j < i + 5; j++) {
      for (let z = j + 1; z < j + 5; z++) {
        const a = s.slice(0, i)
        const b = s.slice(i, j)
        const c = s.slice(j, z)
        const d = s.slice(z, s.length)
        if (validate(a) && validate(b) && validate(c) && validate(d)) {
          arr.push(`${a}.${b}.${c}.${d}`)
        }
      }
    }
  }
  return arr
};

var validate = function (value) {
  if (value.length > 3 || value.length === 0 || +value > 255 || (value[0] === '0' && value.length > 1)) {
    return false
  }
  return true
}