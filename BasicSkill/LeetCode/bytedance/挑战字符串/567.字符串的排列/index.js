/** 18.12.08 */
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const s1Obj = {}
  const s1Length = s1.length
  for (let i = 0; i < s1Length; i++) {
    if (s1Obj[s1[i]]) {
      s1Obj[s1[i]] = ++s1Obj[s1[i]]
    } else {
      s1Obj[s1[i]] = 1
    }
  }

  const s2Length = s2.length

  if (s1Length > s2Length) {
    return false
  }

  const count = s2Length - s1Length
  let str = ''

  for (let i = 0; i <= count; i++) {
    str = s2.slice(i, s1Length + i)
    const s2Obj = {}
    for (let z = 0; z < str.length; z++) {
      if (!s1Obj[str[z]]) {
        i = i + z
        break
      }
      if (s2Obj[str[z]]) {
        s2Obj[str[z]] = s2Obj[str[z]] + 1
      } else {
        s2Obj[str[z]] = 1
      }
    }

    let bool = true
    for (let y = 0; y < Object.keys(s1Obj).length; y++) {
      if (s2Obj[Object.keys(s1Obj)[y]] !== s1Obj[Object.keys(s1Obj)[y]]) {
        bool = false
        break
      }
    }

    if (bool === true) {
      return true
    }
  }

  return false
};