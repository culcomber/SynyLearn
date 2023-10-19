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
var minSubArrayLen = function (target, nums) {
    let start = 0, sum = 0, minSubLen = Number.MAX_SAFE_INTEGER;
    for (let end = 0; end < nums.length; end++) {
        sum += nums[end];
        // 子数组不定长，找到start结束移动位置，sum小于target
        while (sum >= target) {
            // 处理结果
            minSubLen = Math.min(minSubLen, end - start + 1);
            // 移动窗口
            sum -= nums[start];
            start++; // start是加加
        }
    }
    return minSubLen === Number.MAX_SAFE_INTEGER ? 0 : minSubLen;
};
