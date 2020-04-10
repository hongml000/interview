# instanceof
在理解instanceof前，首先要先理解原型和原型链的概念。  
**原理：** instanceof 可以正确的判断对象的类型，因为内部机制是通过判
断对象的原型链中是不是能找到类型的 prototype。  

## 手写一个instanceof
```js
function myInstanceof(left, right) { 
    let prototype = right.prototype 
    left = left.__proto__
    while (true) {
        if (left === null || left === undefined){ 
            return false
        }
        if (prototype === left){
            return true
        }
        left = left.__proto__
  }
}
```

以下是对实现的分析:
* 首先获取类型的原型
* 然后获得对象的原型  
* 然后一直循环判断对象的原型是否等于类型的原型，直到对象 原型为 null，因为原型链最终为 null


## instanceof并不能准备判断所有类型
* instanceof并不能准备判断所有类型，比如原始类型
* 如果是直接定义的原型变量，类型通过typeof进行判断
* 如果是通过构造函数定义的，可以通过instanceof进行判断，但不是很准，因为原始函数的构造函数的原型链上包含Object的prototype
```js
var b = 2
b instanceof Object // false
b instanceof Number // false
typeof b    // "number"


var a = new Number(1)
a instanceof Number // true
a instanceof Object //true
```