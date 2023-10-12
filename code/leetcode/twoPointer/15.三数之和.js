/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    //  O(N∗logN)
    // 升序排列 false不移动 true移动
    nums.sort((a, b) => a - b);
    const resultNum = [];
    for (let i = 0; i < nums.length; i++) {
        // 需要跳过相同元素
        if (i > 0 && nums[i - 1] === nums[i]) {
            continue;
        }
        twoSum(nums, -nums[i], i + 1, resultNum);
    }
    return resultNum;
};

// numbers-原数组 target-目标值 left-开始下标 resultNum-结果数组
var twoSum = function(numbers, target, left, resultNum) {
    // O(N​2)
    let right = numbers.length - 1;
    while(left < right) {
        const sum = numbers[left] + numbers[right];
        if(sum === target) {
            resultNum.push([-target, numbers[left], numbers[right]]);
            left++;
            right--;
            while (left < right && numbers[left] === numbers[left - 1]) {
                left++;
            }
            while (left < right && numbers[right] === numbers[right + 1]) {
                right--;
            }
        } else if(sum > target) {
            right--;
        } else { 
            left++;
        }
    }
};
// @lc code=end

