/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    /* let n = nums.length;
    let arr = new Array(n);
    let left = 0, right = n - 1, index = n -1;
    while (left <= right) {
        if (nums[left] * nums[left] < nums[right] * nums[right]) {
            arr[index--] = nums[right] * nums[right];
            right--;
        } else {
            arr[index--] = nums[left] * nums[left];
            left++;
        }
    }
    return arr; */

    // 倒叙存放到新数组
    let n = nums.length;
    let newArray = new Array(n);
    let left = 0, right = n - 1;
    // console.log(left);
    for (let i = n - 1; i >= 0; i--) {
        // console.log(i);
        if (nums[right] * nums[right] >= nums[left] * nums[left]) {
            newArray[i] = nums[right] * nums[right];
            right--;
        } else {
            newArray[i] = nums[left] * nums[left];
            left++;
        }
    }
    return newArray;
};

// sortedSquares([-4,-1,0,3,10]);
// @lc code=end

