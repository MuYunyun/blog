### tip

注意 `x + y + tag` 的判断

### Analyze

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  const al = a.length, bl = b.length
  const length = Math.max(al, bl)
  let tag = 0
  let str = ''

  for (let i = 0; i < length; i++) {
    const x = i < al ? +a[al - i - 1] : 0
    const y = i < bl ? +b[bl - i - 1] : 0

    const addValue = ((x + y + tag === 1) || (x + y + tag === 3)) ? '1' : '0'
    str += addValue

    if (x + y + tag > 1) {
      tag = 1
    } else {
      tag = 0
    }
  }

  if (tag === 1) {
    str += '1'
  }

  return str.split('').reverse().join('')
};
```