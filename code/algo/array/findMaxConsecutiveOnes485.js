// 输入：nums = [1,1,0,1,1,1]
// 输出：3
// 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

var findMaxConsecutiveOnes = function(nums) {
  let result = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++;
    } else {
      result = Math.max(result, count);
      count = 0; // 重置计算值
    }
  }
  return result;
};

console.log(findMaxConsecutiveOnes([1,1,0,1,1,1]));