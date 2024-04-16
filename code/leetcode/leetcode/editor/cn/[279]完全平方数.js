//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  /*for (let i = 0; i**2 <= n; i++) {
    let value = i**2;
    for (let j = value; j <= n; j++) {
      dp[j] = Math.min(dp[j], dp[j - value] + 1);
    }
  }*/
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j*j <= i; j++) {let value = i**2;
      dp[i] = Math.min(dp[i], dp[i - j*j] + 1);
    }
  }
  return dp[n];
};
//leetcode submit region end(Prohibit modification and deletion)
