/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num === 1) {
        return true;
    }
    let start = 1, end = Math.floor(num / 2), mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (mid * mid === num) {
            return true;
        } else if (mid * mid < num) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return false;
};
// @lc code=end

