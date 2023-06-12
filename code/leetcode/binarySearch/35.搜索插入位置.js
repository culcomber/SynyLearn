/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (target === nums[mid]) {
            return mid;
        } else if (target > nums[mid]) {
            start = mid + 1;
        } else {
            end = end - 1;
        }
    }
    return start; // 没有找到就返回插入target的位置，就是找到刚好大于target的位置
};
// @lc code=end

