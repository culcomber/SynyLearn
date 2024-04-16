/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // dp[i] 凑齐总额i所需要的最少个数
    // 初始化 dp[0] = 0
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    // 先物品
    /* for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
        }
    } */
    // 先背包
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i >= coins[j] && dp[i - coins[j]] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
        
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
console.log(coinChange([1,2,5], 11));
// @lc code=end

