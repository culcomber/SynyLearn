/*
 * @lc app=leetcode.cn id=540 lang=javascript
 *
 * [540] 有序数组中的单一元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    // 有序数组--二分
    let start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        // 确定返回——只出现一次，左右不相等
        if (nums[mid] !== nums[mid -1] && nums[mid] !== nums[mid + 1]) {
            return nums[mid];
        }
        // 移动start end
        if (nums[start] === nums[mid] && nums[mid] === nums[end]) {
            start = start - 1;
            end = end + 1;
        } else if (nums[start] > nums[mid]) {

        } else if (nums[end] < nums[mid]) {
            
        }
    }
};
// @lc code=end

