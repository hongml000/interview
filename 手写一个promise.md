# 第一步
实现一个同步的promise
```js
function Promise(executor) {
  let self = this;
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'fulfilled'
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected'
    }
  }
  // 1. 这里将方法作为实例传递出去
  executor(resolve, reject);  // 直接调用函数，所以this指向window
}


Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  if(this.status === 'fulfilled') {
    // 执行传入的回调函数
    onFulfilled(self.value)
  }
  if(this.status === 'rejected') {
    onRejected(self.reason)
  }
}


// 2. 否则这里显示是形参，而不是函数
var p = new Promise((resolve, reject) => {
  console.log("this:", this)
  // 3. 这里才能直接以形参方法调用函数，注意这里直接调用函数，this指向的是window
  resolve("aaaaa")
})
console.log(p)
p.then(function onFulfilled(res){
  console.log(res)
})
```


# 第二步
在第一步中，我们实现的是同步的promise，但实际中，我们经常要用的是异步的promise，这里我们需要在构造函数中存放两个数组，分别保存成功回调和失败的回调，因为可以then多次，所以需要将这些函数放在数组中
```js
class MyPromise {
  constructor(exector) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.reason = null;

    /**
     * 2.2.6 then may be called multiple times on the same promise
     *  2.2.6.1 If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then
     *  2.2.6.2 If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
     */

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    this.initBind();
    this.init(exector);
  }
  initBind() {
    // 绑定 this
    // 因为 resolve 和 reject 会在 exector 作用域中执行，因此这里需要将 this 绑定到当前的实例
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  init(exector) {
    try {
      exector(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(cb => cb(this.value));
      })
    }
  }

  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach(cb => cb(this.reason));
      })
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {}
    onRejected = typeof onRejected === "function" ? onRejected : () => {}
    if (this.status === MyPromise.FULFILLED) {
      setTimeout(() => {      
        try{
          onFulfilled(this.value)
        }catch(e){
          onRejected(e)
        }
      })
    }

    if (this.status === MyPromise.REJECTED) {
      setTimeout(() => {      
        try{
          onRejected(this.reason);
        }catch(e){
          onRejected(e)
        }
      })
    }

    if (this.status === MyPromise.PENDING) {
      // 向对了中装入 onFulfilled 和 onRejected 函数
      this.onFulfilledCallback.push((value) => {
        try{
          onFulfilled(value)
        }catch(e){
          onRejected(e)
        }
      })

      this.onRejectedCallback.push((reason) => {
        try{
          onRejected(reason)
        }catch(e){
          onRejected(e)
        }
      })
    }
  }
}
MyPromise.PENDING = "pending"
MyPromise.FULFILLED = "fulfilled"
MyPromise.REJECTED = "rejected"
```

# 第三步：实现链式调用



参考：https://www.jianshu.com/p/8d5c3a9e6181