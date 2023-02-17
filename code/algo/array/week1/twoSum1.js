// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

let nums = [2,7,11,15], target = 9;

// 暴力枚举
function twoLoop (nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i; j < nums.length; j++) {
            if (nums[j] + nums[i] === target) {
                return [i, j]
            }
        }
    }
    return [];
};


// 哈希表
function mapData (nums, target) {
    let mapData = [];  
    
    for (let i = 0; i < nums.length; i++) {
        if (mapData[target - nums[i]] !== undefined) {
            return [mapData[target - nums[i]], i];
        } else {
            mapData[nums[i]] = i; // key匹配的值 value结果需要的值
        }
    }
    return [];
};

// console.log(twoLoop(nums, target));
console.log(mapData(nums, target));