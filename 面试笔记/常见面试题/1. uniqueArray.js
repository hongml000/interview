// 判断一个数组是否存在某个元素
function hasItem(arr, item) {
  if(typeof item !== 'object' && typeof item !== 'function') {
    return arr.indexOf(item) !== -1
   }else {
    for(let i in arr) {
      if(JSON.stringify(arr[i]) === JSON.stringify(item)){
        return true;
      }
    }
    return false;
   }
}
console.log(hasItem([1, [1,2,'3'], ['aa'],[1,2],[2,1]], [1,2,'3',4]))
function unique(arr) {
  let res = []
  for(let i in arr) {
    if(!hasItem(res, arr[i])) {
      res.push(arr[i])
    }
  }
  return res;
}
const inputArr = [[1,2],1,['aa'], [3,4], [1,2],{"NAME":"XX"},{"NAME":"XX"}]
const res = unique(inputArr)
console.log("res:", res)


// 优化代码, 时间复杂度2N,即O（n）
function uniqueArray(arr) {
  const newArr = arr.map(item => {
    return JSON.stringify(item)
  })
  const unique = [...new Set(newArr)]
  const uniqueArr = unique.map(item => {
    return JSON.parse(item)
  })
  return uniqueArr
}

const res1 = uniqueArray(inputArr)
console.log('res1:', res1);
