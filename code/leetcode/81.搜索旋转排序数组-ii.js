/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    let start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2) + start;
        if (nums[mid] === target) {
            return true;
        }
        if (nums[start] === nums[mid] && nums[mid] === nums[end]) {
            start = start + 1;
            end = end - 1;
        } else if (nums[start] <= nums[mid]) { // else if，不然nums[start] === nums[mid]会进去上面和下面
            if (target >= nums[start] && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target <= nums[end] && target > nums[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1
            }
        }

    }
    return false;
};
// @lc code=end

