/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x <= 1) {
        return x;
    }
    let start = 1, end = Math.floor(x / 2), mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (mid * mid === x) {
            return mid;
        } else if (mid * mid > x) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return end; // 返回整数部分，如果没有找到返回小于key的index
};
// @lc code=end

