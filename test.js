// var isValid = function (s) {
//   let map = {
//     '(': -1,
//     ')': 1,
//     '[': -2,
//     ']': 2,
//     '{': -3,
//     '}': 3
//   }
//   let stack = []
//   for (let i = 0; i < s.length; i++) {
//     if (map[s[i]] < 0) {
//       stack.push(s[i])
//       console.log(map[s[i]], stack)
//     } else {
//       let last = stack.pop()
//       if (map[last] + map[s[i]] != 0) return false
//     }
//   }
//   if (stack.length > 0) return false
//   return true
// };

// console.log(isValid('({[]})'))


var reg1 = /([a-zA-Z0-9])([,])\1{2}/g    // \2代表和第2个分组匹配到的，完全相同的元素
var reg2 = /([a-zA-Z0-9])(,)\2{2}/g    // \1代表和第1个分组匹配到的，完全相同的元素
let str = 'aaabb,bb,,,cdddss'
// let consult = reg1.test('aaa')
let consult1 = str.match(reg1);
let consult2 = str.match(reg2);


// console.log("consult:", consult)
console.log("consult1:", consult1)
console.log("consult2:", consult2)
// console.log("str1:", str1)

// 例子
let testStr = 'aaadq123555dddlk'
var reg3 = /([a-zA-Z0-9])\1{2}/g  // 匹配连续三个相同的字母（区分大小写）、数字
let result = testStr.replace(reg3, '')  // 删除掉连续的
console.log("result:", result)  // dq123lk