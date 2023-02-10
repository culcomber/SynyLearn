// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

let nums = [2,7,11,15], target = 9;

// 暴力枚举
function twoLoop (nums, target) {
  // todo nums.length - 1
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return [];
};


// 哈希表
function mapData (nums, target) {
  let mapData = {}; // key:value 当前值：下标
  for (let i = 0; i < nums.length; i++) {
    // todo
    if(mapData[target-nums[i]] !== undefined) { // 储存桶中是否有需要的值
      return [mapData[target-nums[i]], i];
    } else {
      mapData[nums[i]] = i;
    }
  }
  return [];
};


console.log(twoLoop(nums, target));
console.log(mapData(nums, target));
let dada = {};
console.log(data.hello !== undefined);
