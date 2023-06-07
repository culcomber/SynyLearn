/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2) + start;
        if (target === nums[mid]) {
            return mid;
        }
        // 分成两部分，start<mid左侧是排好序的
        if (nums[start] <= nums[mid]) { // 等于号，start等于mid
           if (nums[start] <= target && nums[mid] > target) { // 等于号，target在start
             end = mid - 1;
           } else {
             start = mid + 1;
           }
        } else {
            if (nums[end] >= target && nums[mid] < target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
};
// @lc code=end

