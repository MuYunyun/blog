```js
/** remind to clock */
(function remindClock (arr) {
  let print = ''
  for (let i = 1; i < 21; i++) {
    if (arr.indexOf(i) === -1) {
      print += `@${i} `
    }
  }

  if (print === '') return '齐了'
  return `${print}记得打卡`
})([])
```