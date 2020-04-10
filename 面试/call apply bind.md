# 例子
```js
function test(age) {
  var name = "haba"
  console.log("this:", this.name, this.age) // undefined, 
  console.log("local:", name, age) // haba {{age}}
}
var obj = {
  name: "hehe"
}
var obj2 = {
  name: "henry",
  age: 18
}
test(2); 
// this: undefined undefined this指向window,而window未定义此两变量
// local: haba 2

```

# call
改变this指向，并执行方法，返回调用后的结果，call的第一个参数是改变后的this指向对象，后面的都是test的实参
```js
test.call(obj, 2) 
// this: hehe undefined, 实参2是局部变量，不在obj的this指向上
// local: haba 2

test.call(obj2, 3)
// this: henry 18
// local: haba 3
```

注意，实例参数是局部变量，并不会因为this的改变，而赋到this上，如果想要实参同步到改变后的this上，需要做以下修改
```js
function test(name, age) {
  this.name = name;
  this.age = age;
}
```

## 手写一个call


# apply
apply与call基本一致，不同的是apply除第一参数外，其它实参都是以数组形式存在  
用法：test.apply(obj, [...array])
```js
function test(age) {
  var name = "haba"
  this.age = age
  console.log("this:", this.name, this.age) // undefined, 
  console.log("local:", name, age) // haba {{age}}
}
var obj = {
  name: "hehe"
}
var obj2 = {
  name: "henry",
  age: 18
}

test.apply(obj2, [3])
test.apply(obj, [3]) 
// this: henry 3
//VM45:5 local: haba 3

```

## 手写一个apply
```js
// args是数组
Function.prototype.myApply = function(context, args) {
  // 如果不是方法调用call对象，则报错
  if(type this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window;
  context.fn = this; // 相当于context.fn = test()
  var res = context.fn(...args); // 执行改变this过后的函数test()
  delete context.fn; // 删除context.fn这个本来不应该存在的属性
  return res; // 返回调用的
}

test.myApply(obj2, []) // this: henry undefined; local: haba undefined
test.myApply(obj2, [6]) // this: henry 6; local: haba 6
```
* PS: 函数中的缺省值必须写上，不能以fn(,a)调用，因为","会被当成一个运算符，可以以null或undefined占位,只有js数组才可以这样写缺省值
* 

# bind
bind的的用法写法跟call一致，区别在于call立刻调用函数，而bind不会,而是返回一个回调函数，并且执行回调函数时，bind的参数和回调函数的参数将合并作为执行函数的参数
```js
function test(age) {
  var name = "haba"
  this.age = age  // 改变this后，name
  console.log("this:", this.name, this.age)
  console.log("local:", name, age)
}
var obj = {
  name: "hehe"
}
var obj2 = {
  name: "henry",
  age: 18
}

// 等同于 test.call(obj,6)
let t = test.bind(obj)
t(6) 
// this: undefined 6 
// local: haba 6


// 等同于 test.call(obj,0,8)
let tt1 = test.bind(obj,0)
tt1(8)
```

## 手写实现bind
```js
// 这个方法也可以实现，但是不好的地方就是没有清除掉context.fn属性
Function.prototype.myBind = function(context, ...args) {
  // 如果不是方法调用call对象，则报错
  if(type this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window;
  context.fn = this;
  return function() {
    context.fn(...[...args, ...arguments]) 
  };
}
let t2 = test.myBind(obj)
console.log(obj)
t2(9)

// >>>
// this: hehe 9
// local: haba 9 
// { name: 'hehe', age: 9, fn: [Function: test] }




// 改进，使用apply方法清除context.fn属性
Function.prototype.myBind = function(context, ...args) {
  // 如果不是方法调用call对象，则报错
  if(type this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window;
  let self = this;
  return function() {
    // 利用apply清除属性
    self.apply(context, [...args, ...arguments]);
  }
}
test.myBind(obj)(9)
console.log(obj)
// >>>
// this: hehe 9
// local: haba 9 {
//   name: 'hehe',
//   age: 9
// }
```