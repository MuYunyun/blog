// 第二版测试: 封装 request,response,context 对象

const Koa = require('../application')

const app = new Koa()

// // 测试自定义扩展
// app.context.handle = function (errNo = 0, data, errMsg) {
//   this.res.setHeader('Content-Type', 'application/json;charset=utf-8')
//   // 注意 this 指向调用函数的对象, 也就是 ctx
//   this.body = {
//     errNo,
//     data,
//     errMsg
//   }
// }

// // 调用自定义扩展
// app.use(async (ctx) => {
//   ctx.handle({
//     errNo: 0,
//     data: {
//       name: '小明',
//     },
//     errMsg: 'success',
//   })
// })

// 第二版最主要目的是把 app.use(req, res) 参数转化为简洁的写法如下:
app.use(async (ctx) => {
  ctx.body = `hello ${ctx.query.name}`
})

app.listen(3000, '127.0.0.1', () => {
  console.log('listening on the 3000')
})