/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    if (nums.length < 3) {
        return ans;
    }
    // 不包含重复项，排序
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break; // 如果最小的数大于零总和不能为0
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
        let left = i, right = nums.length - 1;
        if (nums[i] + nums[right] + nums[left] === 0) {
            ans.push([nums[i], nums[right], nums[left]])
            // 去重
            while (left < right && nums[left] === nums[left + 1]) left++;
            while (left < right && nums[right] === nums[right - 1]) right++;
            i++;
            j--;
        }
        else if (sum < 0) left++;
        else if (sum > 0) right--;
    }
    return ans;
  };
  
  console.log(threeSum([-1,0,1,2,-1,-4]));