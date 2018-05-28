const Koa = require('../application')

const app = new Koa()

const responseData = {}

// 第三版测试：测试中间件
app.use(async (ctx, next) => {
  responseData.name = 'xiaoming'
  ctx.body = responseData
  await next()
  responseData.age = '14'
})

app.use(async (ctx, next) => {
  responseData.gender = 'male'
  await next()
})

app.use(async (ctx) => {
  responseData.habbit = 'music'
})

app.listen(3000, '127.0.0.1', () => {
  console.log('listening on the 3000')
})