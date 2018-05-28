let _body

module.exports = {
  get body() {
    return _body
  },

  set body(content) {
    _body = content
  },
}