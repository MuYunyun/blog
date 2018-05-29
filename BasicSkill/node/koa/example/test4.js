// 完善的框架都有相应的错误捕获机制
const Koa = require('../application')

const app = new Koa()

const responseData = {}

// 第四版测试：错误机制测试
app.use(async (ctx, next) => {
  throw new Error('ooops')
})

app.on('error', (err) => {
  console.log('111', err.stack)
})

app.listen(3000, '127.0.0.1', () => {
  console.log('listening on the 3000')
})