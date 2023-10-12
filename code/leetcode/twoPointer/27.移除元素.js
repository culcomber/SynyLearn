/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    /* let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            // slow += 1;
            nums[slow++] = nums[fast]; // 当不等于val更新快慢指针，等于只更新快指针
        }
    }
    return slow; */

    // 第二次，在原数组上操作
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        // slow移动：nums[fast]不等于val
        if(nums[fast] !== val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
};
// @lc code=end

