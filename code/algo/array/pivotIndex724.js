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