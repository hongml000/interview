# SSR
## CSR和SSR的区别？
### CSR：client site render,客户端（浏览器）渲染
无论是vue还是jquery，页面都是由js渲染出来的，js是运行在浏览器端，所以我们称之为客户端渲染
步骤：
1. 请求一个html
2. 服务器会返回一个html
3. 浏览器会下载html里的js/css文件
4. 等待js文件全部下载完成
5. 等待js加载并初始化完成
6. js代码执行完成，js向后端请求数据
7. 等待数据返回
8. 客户端从无到有完整的把数据渲染为页面


像以下这个例子，查看页面源码时，h1是无内容的，执行的内容是由js运行渲染出来的，这就叫做客户端渲染。像jquery、vue、react就是典型的CSR
```html
<body>
  <h1></h1>
  <input type="text" name="user"/>
  <input type="password" name="password"/>
  
  <script>
    // ajax请求数据后将数据填充到h1上
    $(function() {
      $.ajax({
        type: "post",
        url:"http://localhost/login/check.php",
        data:{
          user: $(":text").val(),
          password: $(":password").val(),
        },
        dataType:"json"
      }).then(function(res) {
        if(res.code === "200") {
          $("h1").html("登录成功")
        }else {
          $("h1").html("登录失败")
        }
      })
    })
  </script>
</body>
```

### SSR：server site render,服务端渲染
步骤：
1. 请求一个html
2. 服务器去请求数据（内网）
3. 服务器初始渲染
4. 返回已经有正确内容的页面
5. 客户端请求js/css文件
6. 等待js文件下载完成
7. js代码加载并初始化完成
8. 客户端把剩下一部分渲染完成（很小一部分）


服务端把渲染的完整的页面吐给我们的客户端，这样子减少了客户端到服务端的一次http请求，加快了响应速度  
一般的话，用于首屏的性能优化  
CSR是目前流行的渲染方式，它依赖的是运行在客户端的JS，用户首次发送请求的时候只能得到一部分指引性的html代码  

## 怎么进行技术选型？
如果是后台管理，是交互比较强的，也不需要SEO，因为不会让别人爬到你的后台，这种就可以使用客户端渲染
如果需要SEO，且客户端渲染时间过长时，会影响用户体验的，页面很少进行修改的，可以使用服务端渲染

vue nuxt
react next