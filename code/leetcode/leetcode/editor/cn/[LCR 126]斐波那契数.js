//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
/*var fib = function(n) {
    // 1状态 dp[n]表示n的的斐波那契数
    const dp = new Array(n);
    // 2初始化
    dp[0] = 0, dp[1] = 1;
    // 3状态转移方程 dp[n] = dp[n - 1] + dp[n - 2]
    // 4执行
    for (let i = 2; i <= n; i++) {
        // 答案要求取模 (x+y)⊙p=(x⊙p+y⊙p)⊙p ⊙取模
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
    }
    // 5返回结果
    return dp[n];
};*/

// 求解n只需要n - 1 和 n - 1的斐波那契数，所以可以优化dp数组，维持长度为3数组，不断更新前面两个值
var fib = function(n) {
    if (n < 2) {
        return n;
    }
    // 1状态 dp[n]表示n的的斐波那契数
    const dp = new Array(3);
    // 2初始化
    dp[0] = 0, dp[1] = 1;
    // 3状态转移方程 dp[n] = dp[n - 1] + dp[n - 2]
    // 4执行
    for (let i = 2; i <= n; i++) {
        // 答案要求取模 (x+y)⊙p=(x⊙p+y⊙p)⊙p ⊙取模
        dp[2] = (dp[1] + dp[0]) % 1000000007;
        dp[0] = dp[1];
        dp[1] = dp[2];
    }
    // 5返回结果
    return dp[2];
};
// fib(4)
//leetcode submit region end(Prohibit modification and deletion)
