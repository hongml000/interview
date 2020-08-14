var arr = [1, 1, 2, 2, 3, 4, 6, 6, 8, 8]
// 方法1：set
// let result = [...new Set(arr)] // [ 1, 2, 3, 4, 6, 8 ]
// console.log('result:',result);

// // 方法2：使用indexOf
// const len = arr.length;
// let result = []
// for(let i =0; i<len; i++ ) {
//   if(result.indexOf(arr[i]) === -1) {
//     result.push(arr[i])
//   }
// }
// console.log('result2:',result); // [ 1, 2, 3, 4, 6, 8 ]

// // 方法3：使用includes判断是否存在某值
// const len = arr.length;
// let result = []
// for(let i =0; i<len; i++ ) {
//   if(!result.includes(arr[i])) {
//     result.push(arr[i])
//   }
// }
// console.log('result3:',result); // [ 1, 2, 3, 4, 6, 8 ]

// 方法4：利用Map去重
// Map是一组键值对的结构，具有极快的查找速度。
// const map = new Map() // 初始化Map需要一个二维数组
// console.log('map:',map); // map: Map {}
// const map = new Map([['name', 'haha']]) // 初始化Map需要一个二维数组
// console.log(map); // Map { 'name' => 'haha' }
// const name = map.get('name')
// console.log(name); // haha
// map.set('age', 15)
// console.log(map); // Map { 'name' => 'haha', 'age' => 15 }

// const map = new Map() // 初始化Map
// const len = arr.length;
// let result = []
// for(let i =0; i < len; i++){
//   if(!map.has(arr[i])) {
//     map.set(arr[i], true)
//     result.push(arr[i])
//   }
// }
// console.log('result4:',result); // [ 1, 2, 3, 4, 6, 8 ]


// 方法5： 双重for循环，使用splice把重复的删除
const len = arr.length;
// for(let i =0; i< len; i++) {
//   for(let j = len-1; j > i; j--) {
//     if(arr[i] === arr[j]) {
//       arr.splice(j,1)
//     }
//   }
// }
// console.log('arr:', arr);

// 方法6： 建立一个新数组，双重for循环遍历原数组和新数组，如果新数组没有原数组元素，就加入新数组，如果有，则结束第一个循环
// let result = []
// for(let i =0; i< len;i++){
//   for(var j=0; j<result.length; j++) {
//     if(arr[i] === result[j]) {
//       break;
//     }
//   }
//   if(j === result.length) {
//     result.push(arr[i])
//   }
// }
// console.log('result:', result);


// 方法7： 利用filter和indexOf来去重
const result = arr.filter(function(item, index) {
  return arr.indexOf(item) === index;
})
console.log('result:', result);


 
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
} })();