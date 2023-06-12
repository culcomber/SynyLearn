/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let result = Infinity, sum = 0, start = 0, end = 0;
    while (end < nums.length) {
        sum += nums[end];
        while (sum >= target) {
            result = Math.min(result, end - start + 1);
            sum -= nums[start++];
        }
        end++;
    }
    return result === Infinity ? 0 : result;
};
// @lc code=end

