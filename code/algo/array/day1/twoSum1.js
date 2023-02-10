// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

let nums = [2,7,11,15], target = 9;

// 暴力枚举
function twoLoop (nums, target) { 
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] + nums[i] === target) {
        return [i, j];
      }
    }
  }
  return [];
};


// 哈希表
function mapData (nums, target) {
  let dataMap = {};
  for (let i = 0; i < nums.length; i++) {
    let tagetValue = target-nums[i];
    if (dataMap[tagetValue] !== undefined) {
      return [dataMap[tagetValue], i];
    } else {
      dataMap[nums[i]] = i;
    }
  }
  return [];
};


console.log(twoLoop(nums, target));
console.log(mapData(nums, target));


