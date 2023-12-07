/*
 * @lc app=leetcode.cn id=643 lang=javascript
 *
 * [643] 子数组最大平均数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    // 开始位置，累计值，返回结果
    let start = 0, sum = 0, maxAverage = Number.MIN_SAFE_INTEGER;
    for (let end = 0; end < nums.length; end++) { // 右边不断往前移动
        sum += nums[end];
        if (end >= k - 1) { // 当窗口等于k移动左侧
            // 计算结果
            maxAverage = Math.max(maxAverage, sum / k);
            // 移动窗口
            sum -= nums[start];
            start++;
        }
    }
    return maxAverage;
};
// @lc code=end

