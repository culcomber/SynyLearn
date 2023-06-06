/*
 * @lc app=leetcode.cn id=154 lang=javascript
 *
 * [154] 寻找旋转排序数组中的最小值 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let start = 0, end = nums.length - 1, mid;
    while (start < end) {
        mid = Math.floor((end - start) / 2 + start);
        if (mid < end && nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        if (mid > start && nums[mid] < nums[mid - 1]) {
            return nums[mid];
        }
        if (nums[start] === nums[mid] && nums[mid] === nums[end]) {
            if (nums[start] > nums[start + 1]) { // 和范围内比
                return nums[start + 1];
            }
            start += 1;
            if (nums[end - 1] > nums[end]) {
                return nums[end];
            }
            end -= 1;
        }
        if (nums[start] < nums[mid] || (nums[start] === nums[mid] && nums[mid] > nums[end])) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return nums[0];
};
// @lc code=end

