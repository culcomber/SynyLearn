// 输入：nums = [1, 7, 3, 6, 5, 6]
// 输出：3
// 解释：
// 中心下标是 3 。
// 左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
// 右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  let result = 0;
  const total = nums.reduce((a, b) => a + b, 0);
  for (let i = 0; i < nums.length; i++) {
   if (2 * result + nums[i] === total) {
    return i;
   }
   result += nums[i];
  }
  return -1;
};

console.log(pivotIndex([1, 7, 3, 6, 5, 6]));