//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n < 2) {
        return 1;
    }
    const dp = new Array(3);
    // 可以装换成 LCR 126. 斐波那契数，但是初始值不一样
    dp[0] = 1; dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[2] = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = dp[2];
    }
    return dp[2];
};
//leetcode submit region end(Prohibit modification and deletion)
