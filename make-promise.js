
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