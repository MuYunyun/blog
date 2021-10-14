<!--
abbrlink: 6nqz8uu6
-->

```js
const url = require('url')

module.exports = {
  get query() {
    return url.parse(this.req.url, true).query
  }
}
```