### ajax 实现

```js
var xhr = new XMLHttpRequest()

xhr.open('GET', '/api', true)
xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    console.log(this.responseText)
  }
}
xhr.send(null)
```

结合 Promise 来封装 fetch

```js
function fetch(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(this.responseText)
      } else {
        reject(new Error(this.status))
      }
    }
    xhr.send(null)
  })
}

fetch('/post.json')
  .then((fulfilled) => {
    console.log(fulfilled)
  })
  .catch((rejected) => {
    console.log(rejected)
  })
```
