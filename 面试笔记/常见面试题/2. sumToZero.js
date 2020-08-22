
// 时间复杂度o(n3)
function sumToZero(arr) {
  const len = arr.length;
  const res = []
  for(let i = 0; i < len; i++) {
    let sum1 = arr[i];
    for(let j = i + 1; j < len; j++) {
      let sum2 = sum1 + arr[j];
      for(let z = j + 1; z < len; z++) {
        if(sum2 + arr[z] === 0){
          let result = JSON.stringify([arr[i],arr[j],arr[z]].sort());
          if(res.indexOf(result) === -1){
            res.push(result);
          }
        }
      }
    }
  }
  const zeroArr = res.map(item => {return JSON.parse(item)})
  return zeroArr
}
const res = sumToZero([1,2,3,4,5,-1,-2,-1])
console.log('res:', res);

// 方法2，两重循环，使用map存储第三个值作为map的key，然后判断是否固定两个值后的第三个值是否在map中
function sumToZero2(arr) {
  const len = arr.length;
  const map = new Map()
  const result = [];
  let num3;
  for(let i=0; i<len; i++) {
    for(let j=i+1; j<len; j++) {
      num3 = 0 - arr[i] - arr[j];
      map.set(num3, [arr[i], arr[j]])
      if(map.has(arr[j])) {
        const res = JSON.stringify([arr[j], ...map.get(arr[j])].sort())
        result.push(res)
        map.delete(arr[j])
      }
    }
  }
  return result.map(item => {return JSON.parse(item)});
}
const res22 = sumToZero([1,2,3,0,4,5,-1,-2,-1,0,0])
console.log('res22:', res22);


function moveZeroEnd(arr) {
  let len = arr.length;
  for(let i =0; i< len; i++) {
    if(arr[i]===0) {
      arr.splice(i,1)
      arr.push(0)
      i -= 1;
      len -= 1;
    }
  }
  return arr;
}
const arr = [0,1,0,3,12]
const res2 = moveZeroEnd(arr)
console.log("res2:", res2)

function moveZeroToEnd(arr) {
  let len = arr.length;
  for(let i =0; i< len; i++) {
    if(arr[i]===0) {
      // arr.splice(i,1)
      // arr.push(0)
      // i -= 1;
      // len -= 1;
      for(let j =i; j<len; j++) {
        if(j !== len -1) {
          arr[j] = arr[j+1]
        }else {
          arr[i] =0
        }
      }
      i -= 1;
      len -= 1;
    }
  }
  return arr;
}

const res3 = moveZeroToEnd(arr)
console.log("res3:", res3)


const arr1 = [1,2,0,3,4,0,5,-1,-2,-1]
var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
  return nums;
};
const res4 = moveZeroes(arr1)
console.log("res4:", res4)



const arr2 = [1,2,0,3,4,0,5,-1,-2,-1]

// var moveZeroes2 = function (nums) {
//   const len = nums.length
//   for (let i = 0; i < len; i++) {
//     if (nums[i] === 0 && i !== len-1) {
//       [nums[i],nums[i+1]] = [nums[i+1],nums[i]]
//     }
//   }
//   return nums;
// };
// const res5 = moveZeroes2(arr2)
// console.log("res5:", res5)