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