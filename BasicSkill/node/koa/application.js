const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
  constructor() {
    this.middlewares = []
    this.context = context
    this.request = request
    this.response = response
  }

  listen(...args) {
    http.createServer(this.callback()).listen(...args)
  }

  use(fn) {
    this.middlewares.push(fn)
  }

  compose(ctx) {
    const createAsync = function (fn, next) {
      return async function () {
        await fn(ctx, next)
      }
    }
    let next = async function() {
      return Promise.resolve()
    }

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      next = createAsync(this.middlewares[i], next)
    }

    return next()
  }

  callback() {
    return (req, res) => {
      const ctx = this.createCtx(req, res)
      const handle = () => this.handleRes(ctx)
      const fn = this.compose(ctx) // 引人中间件
      fn.then(handle)
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