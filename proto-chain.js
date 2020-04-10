function Dog() {
  this.sound = "wang"
}

function Haba() {
  this.sound = "wangwang"
}

Haba.prototype = new Dog()
haba = new Haba();
console.log(haba.__proto__) // { sound: 'wang' }
console.log(haba.__proto__.__proto__) // {}

// 如以上例子的原型链为： 
// Haba.prototype-->Dog.prototype-->Object.prototype 
// 或者
// haba.__proto__(Dog.prototype)-->haba.__proto__.__proto__(Object.prototype)-->haba.__proto__.__proto__.__proto__({})

console.log(0.1 + 0.2)