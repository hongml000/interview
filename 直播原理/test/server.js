// const http = require('http')
// const url = require('url')
// // const app = express()
// // const port = 3000
// let fs = require("fs");

// http.createServer((req, res) => {

//   console.log(req.url);
//   console.log(url.parse(req.url, true))
//   if(req.url === "/"){
//     console.log("11111")
//     fs.readFile('./index.html', (err, data) => {
//       if(err) {
//         res.end("404,page is not found")
//       }else {
//         res.end(data)
//       }
//     })
//   }else if(req.url === "/error") {

//   }
// }).listen(8888)
// // app.get('/', (req, res) => {
// //   fs.readFile("./index.html", (err, data) => {
// //     if (err) {
// //       // err是指发生的错误
// //       console.log(err);
// //     } else {
// //       // data指的是对应的二进制文件
// //       // console.log(data);
// //       // console.log(data.toString());
// //       res.send(data.toString())
// //     }
// //   });
// // })
// // app.get('/error', (req, res) => {
// //   console.log("res:", req)
// //     if (err) {
// //       // err是指发生的错误
// //       console.log("err:", err);
// //     } else {
      
// //     }
// //   })
// // res.send('Hello World!')
//   // res.render("./index.html")

// // app.use(express.static('.'))
// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const Koa = require("koa")
// const fs = require("fs")
// const app = new Koa()
// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = "text/html"
//   ctx.response.body = '<h1>hello koa</h1>'
//   console.log(ctx.request)
  
//   // if(ctx.request.url === "/") {
//   //   console.log("路径是/")
//   //   ctx.response.type = "text/html"
//   //   ctx.response.body = '<h1>hello koa</h1>'

//   //   fs.readFile('./index.html', (err,data) => {
//   //     if(err) {
//   //       ctx.response.body = '<h1>404, page is not founded</h1>';
//   //     }else {
//   //       ctx.response.body = '<h1>hello koa</h1>'
//   //       // data.toString()
//   //     }
//   //   })
//   // }
//   // { method: 'GET',
//   //   url: '/',
//   //   header:
//   //     { host: 'localhost:3000',
//   //       connection: 'keep-alive',
//   //       'cache-control': 'max-age=0',
//   //       'upgrade-insecure-requests': '1',
//   //       'user-agent':
//   //         'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36',
//   //       accept:
//   //         'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//   //       'sec-fetch-site': 'none',
//   //       'sec-fetch-mode': 'navigate',
//   //       'sec-fetch-user': '?1',
//   //       'sec-fetch-dest': 'document',
//   //       'accept-encoding': 'gzip, deflate, br',
//   //       'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8' 
//   //       } 
//   // }
// })
// app.listen(3000)
// console.log('app started at port 3000...');


const Koa = require('koa');
const fs = require('fs')
// const Router = require('koa-router')
const app = new Koa();

// // 创建一个router对象，作为首页
// let home = new Router();
// home.get('/', async(ctx) => {
//   fs.readFile('./index.html', (err,data) => {
//     if(err) {
//       ctx.body = "404, not found"
//     }else {
//       ctx.body = data
//     }
//   })
// })
// app.use(async ctx => {
//   ctx.body = 'Hello World';
//   if(ctx.url === "/" && ctx.method === 'GET') {
//     fs.readFile('./index.html', (err,data) => {
//       if(err) {
//         ctx.body = "404, not found"
//       }else {
//         ctx.body = data
//       }
//     })
//   }
// });

// app.listen(3000);

// const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
// const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
    // if(ctx.url === "/" && ctx.method === 'GET') {
      fs.readFile('./index.html', (err,data) => {
        console.log("data:", data.toString())
        console.log("err", err)
        if(err) {
          ctx.response.body = "404, not found"
        }else {
    ctx.response.body = '<h1>Hello, koa2!</h1>';

          // ctx.response.body = data.toString()
        }
      })
    // }
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');