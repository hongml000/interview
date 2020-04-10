Person.prototype.job = "student"
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.print = function() {
    console.log(this.name + '的年龄为' + this.age)
  }
}

var person = new Person("Mary", 16)
person.print() // Mary的年龄为16

console.log(person) // Person { name: 'Mary', age: 16, print: [Function] }
console.log(person.__proto__) // Person { job: 'student' }
console.log(Person.prototype) // Person { job: 'student' }
console.log(person.__proto__.constructor) // [Function: Person]，指向构造函数
console.log(Person.prototype.constructor) // [Function: Person]