/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow++] = nums[fast];
        }
    }

    // 后面补零
    for (let index = slow; index < nums.length; index++) {
        nums[index] = 0;
    }

    return nums;

    /* let zeroIndex = 0; // 基准
    for (let i = 0; i < nums.length; i++) {
        // 进行交换
        if (nums[i] !== 0) {
            const item = nums[i];
            nums[i] = nums[zeroIndex];
            nums[zeroIndex++] = item;
        }
    }
    return nums; */
};
// @lc code=end

