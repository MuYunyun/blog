```js
const url = require('url')

module.exports = {
  get query() {
    return url.parse(this.req.url, true).query
  }
}
```