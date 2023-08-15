/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // if (nums.length <= 1) return nums.length;
    // let slow = 0;
    // for (let fast = 1; fast < nums.length; fast++) {
    //     if (nums[fast] !== nums[slow]) {
    //         nums[++slow] = nums[fast];
    //     }
    // }
    // return slow; 

    // 先处理极限情况
    if (nums.length <= 1) return nums.length;
    let slow = 1;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast - 1] !== nums[fast]) {
            nums[slow++] = nums[fast];
        }
        
    }
    return slow;
};
// @lc code=end

