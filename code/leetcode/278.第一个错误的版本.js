/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let start = 1, end = n, mid;
        while (start <= end) {
            mid = Math.floor((end - start) / 2) + start;
            if (isBadVersion(mid)) {
                end = mid - 1; // end不断收束找到第一个
            } else {
                start = mid + 1;
            }
        }
        return start; // end最后收束在错误前一个，start是end下一个正好就是错误的开始
    };
};
// @lc code=end

