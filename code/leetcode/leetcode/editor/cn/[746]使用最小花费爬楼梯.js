//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} cost
 * @return {number}
 */
/*var minCostClimbingStairs = function(cost) {
    const len = cost.length + 1;
    const dp = new Array(len).fill(0);
    for (let i = 2; i < dp.length; i++) {
        dp[i] = Math.min((dp[i - 1] + cost[i - 1]), (dp[i - 2] + cost[i - 2]));
    }
    return dp[len - 1];
};*/
var minCostClimbingStairs = function(cost) {
    // 和求解斐波那契数一样最终结果只和前面两个数有关，可以只保存前两个数的值
    let pre = 0, curr = 0;
    const len = cost.length + 1;
    for (let i = 2; i < len; i++) {
        const next = Math.min((curr + cost[i - 1]), (pre + cost[i - 2]));
        pre = curr;
        curr = next;
    }
    return curr;
};
//leetcode submit region end(Prohibit modification and deletion)
