# callback
## 什么是callback
**在理解promise前，我们先了解下什么是callback（回调函数）：**  
      A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.  

回调与同步、异步并没有直接的联系，回调只是一种实现方式，既可以有同步回调，也可以有异步回调，还可以有事件处理回调和延迟函数回调，这些在我们工作中有很多的使用场景。  
```js
// 使用回调函数的例子

// 异步请求的回调函数
$.get('ajax/test.html',function(data){
  $('#box').html(data);
})
// 点击事件的回调
$('#btm').click(function(){
  alert("click me");
})

// 同步回调
function getNodes(params, callback) {
  var list = JSON.parse(params);
  if(typeof callback === "function") {
    callback(list);
  }
}
getNodes(['1,2,3]', function(nodes){
  // 处理nodes  
})
```
## 把使用this对象的函数作为回调函数(陷阱)
当回调函数是一个使用this对象的函数时，我们必须改变执行回调函数的调用对象来保证this对象的上下文。
先明确判断函数中this指向的方法：
1. this是在函数执行时确定的，在函数定义时确定不了，实际this的最终指向是那个调用函数的对象
2. 如果没有对象调用函数，而是直接执行函数，则this指向window
```js
var clientData = {
    id: 096545,
    fullName: "Not Set",
    //setUsrName是一个在clientData对象中的方法
    setUserName: function (firstName, lastName){
        this.fullName = firstName + " " + lastName;
    }
} 

function getUserInput(firstName, lastName, callback){
    //code .....

    //调用回调函数存储
    callback(firstName, lastName); // this指向window
}

getUserInput("Barack","Obama",clientData.setUserName);

console.log(clientData.fullName);  //Not Set

console.log(window.fullName);  //Barack Obama
```

当clientData.setUsername被执行时，this.fullName并没有设置clientData对象中的fullName属性。相反，它将设置window对象中的fullName属性，这是因为callback中的this指向window的缘故。

### 使用Call和Apply函数来改变this指向
```js
var clientData = {
  id: 096545,
  fullName: "Not Set",
  //setUsrName是一个在clientData对象中的方法
  setUserName: function (firstName, lastName) {
    this.fullName = firstName + " " + lastName;
  }
}

function getUserInput(firstName, lastName, callback) {
  // code .....
  // 使用call改变this指向
  callback.call(this,firstName, lastName);  
  // 使用apply改变this指向
  callback.apply(this,[firstName, lastName]);
}

getUserInput("Barack", "Obama", clientData.setUserName);
console.log(clientData.fullName); // 不改变this指向: Not Set; 改变this指向：Barack Obama
console.log(window.fullName); // 不改变this指向: Barack Obama
```
## 回调的应用
* 异步调用（例如读取文件，进行HTTP请求，动态加载js文件，加载iframe资源后，图片加载完成执行回调等等）
* 事件监听器/处理器
* setTimeout和setInterval方法
* 一般情况：精简代码

## 地狱回调
地狱回调是指多层回调嵌套，而使代码看懂非常困难的情况。
```js
var p_client = new Db('integration_tests_20', new Server("127.0.0.1", 27017, {}), {'pk':CustomPKFactory});
   p_client.open(function(err, p_client) {
       p_client.dropDatabase(function(err, done) {
           p_client.createCollection('test_custom_key', function(err, collection) {
               collection.insert({'a':1}, function(err, docs) {
                   collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}, function(err, cursor) {
                       cursor.toArray(function(err, items) {
                           test.assertEquals(1, items.length);
 
                           // Let's close the db
                           p_client.close();
                       });
                   });
               });
           });
       });
   });
```

### 地狱回调的解决
1. 给你的函数命名，并传递它们的名字作为回调函数，而不是在参数里直接写匿名函数
2. 使用模块化将代码分隔到模块中，然后在巨型应用中导入模块
3. 使用promise解决

# promise
## 面试题
Promise 的特点是什么，分别有什么优缺点?什么是 Promise 链?Promise 构造函数执行和 then 函数执行有什么 区别?

## promise是什么？
在JavaScript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现。那么使用回调函数

* 这种“承诺将来会执行”的对象在JavaScript中称为Promise对象，也是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve、race这几个方法，原型上有then、catch等方法。

## promise的特点？
Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## promise能做什么？
### 1.在异步执行中，可以把执行代码和处理结果代码分离
将原来的回调的方法，使用链式调用的方法执行回调
  ```js
  // 执行代码即test函数所要处理的事
  function test(resolve, reject) {

  }
  // 处理结果则为：成功则在then中函数处理，失败则在catch函数中处理
  new Promise(test).then(function (result) {
      console.log('成功：' + result);
  }).catch(function (reason) {
      console.log('失败：' + reason);
  });
  ```
### 2.串行执行若干异步任务，即链式执行异步任务 
 ```js
job1.then(job2).then(job3).catch(handleError);
```
### 3.并行执行异步代码
```js
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1'); // 等同于setTimeout(resolve('P1'), 500)
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});
```
### 4.可以使用promise.race增加多任务的容错率
```js
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'，p1先返回，p2虽然仍在执行，但结果会被抛弃
});
```

## promise链
Promise实现了链式调用，也就是说每次调用then之后返回的都是一个Promise，并且是一个全新的Promise

## promise构造函数和then函数执行有什么区别？
### 构造函数
当我们在构造promise时，构造函数内部的代码是立即执行的，其执行顺序是同步的。
### then函数
当我们使用then执行函数，其执行顺序是异步的，不用等到then的结果，会继续往下执行
```js
let promise = new Promise((resolve, reject) => {
    console.log(`开始执行`)
    
    // 如果执行成功，则调用resolve()
    resolve('success')
    
    console.log(`执行中ing`)
  }).then(res => {
    console.log(res)
    console.log('执行成功，继续执行下一步')
    return '第二then方法，开始' // 会调用 Promise.resolve('第二then方法，开始')
  })

// 如果执行成功，则继续调用then方法
promise.then(res => {
  console.log(res)
})

// promise内部是同步的，但是then方法是异步的
console.log(`我会在then方法前，先执行`)

// 我们可以利用timeout方法在then方法执行完成后，进行执行
setTimeout(()=>console.log(`then方法执行完成后，开始执行`))
```
执行结果：
1.开始执行
2.执行中ing
3.我会在then方法前，先执行
4.执行成功，继续执行下一步
5.第二then方法，开始
6.then方法执行完成后，开始执行

# promise缺点
无法取消promise,错误需要通过回调函数获取

# promise实际应用
## 同步执行异步操作
```js
var job1 = new Promise()
job1.then(job2).then(job3)
```

## 网络超时设置
设定一个请求超过10s，则判定为网络超时
```js
function fetchData() {
  var p = new Promise((resolve, reject) => {
    // ... 向后端发送请求，返回res
    resolve(res)
  });
  return p;     // 这一步不能少，否则返回的是undefined
}

function timeout() {
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, 10000)
  });
  return p;
}
Promise.all([fetchData(), timeout()]).then(data => {
  console.log('请求成功')；
  console.log(data)；
})
.catch(err => {
  console.log('请求失败')；
  console.log(err)； //请求超时
})
```

参考：
傻小胖：https://blog.csdn.net/qq_34645412/article/details/81170576
廖雪峰：https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544
面试：http://www.bslxx.com/a/mianshiti/tiku/2017/1026/1086.html
callback: https://www.jianshu.com/p/84cc8732689c
