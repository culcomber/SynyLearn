/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
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
        // 返回——最小值是唯一比前面数值小的
        if (mid < end && nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        if (mid > start && nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }
        // 移动start or end
        if (nums[start] < nums[mid]) { // 上面检查了mid左右，此时左侧就是单调递增的
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return nums[0];
};
// @lc code=end

