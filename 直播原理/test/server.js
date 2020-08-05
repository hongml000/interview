const express = require('express')
const app = express()
const port = 3000
let fs = require("fs");

app.get('/', (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      // err是指发生的错误
      console.log(err);
    } else {
      // data指的是对应的二进制文件
      // console.log(data);
      // console.log(data.toString());
      res.send(data.toString())
    }
  });
})
app.get('/error', (req, res) => {
  console.log("res:", req)
    if (err) {
      // err是指发生的错误
      console.log("err:", err);
    } else {
      
    }
  })
// res.send('Hello World!')
  // res.render("./index.html")

app.use(express.static('.'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))