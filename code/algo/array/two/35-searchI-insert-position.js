// 示例 1:
// 输入: [1,3,5,6], 5
// 输出: 2

// 示例 2:
// 输入: [1,3,5,6], 2
// 输出: 1

// 目标值在数组所有元素之前
// 目标值等于数组中某一个元素
// 目标值插入数组中的位置
// 目标值在数组所有元素之后
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1, result;
    while (left <= right) { 
        result = left + Math.floor((right - left) / 2);
        if (nums[result] < target) { 
            left = result + 1;
        } else if (nums[result] > target) {
            right = result - 1;
        } else { 
            return result;
        }
    } 
    return right + 1;
};

let nums = [1,3,5,6], target = 5;
console.log(searchInsert(nums, target));