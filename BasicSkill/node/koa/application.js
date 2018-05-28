const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
  constructor() {
    this.callbackFn
    this.context = context
    this.request = request
    this.response = response
  }

  listen(...args) {
    http.createServer(this.callback()).listen(...args)
  }

  use(fn) {
    this.callbackFn = fn
  }

  callback() {
    return (req, res) => {
      const ctx = this.createCtx(req, res)
      const handle = () => this.handleRes(ctx)
      this.callbackFn(ctx).then(handle)
    }
  }

  createCtx(req, res) {
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  handleRes(ctx) {
    if (typeof(ctx.body) === 'string') {
      ctx.res.end(ctx.body)
    } else if (typeof(ctx.body) === 'object') {
      ctx.res.end(JSON.stringify(ctx.body))
    }
  }
}

module.exports = Koa