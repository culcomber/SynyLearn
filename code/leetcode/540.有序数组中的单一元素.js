/*
 * @lc app=leetcode.cn id=540 lang=javascript
 *
 * [540] 有序数组中的单一元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    // 有序数组--二分
    let start = 0, end = nums.length - 1, mid;
    while (start < end) { // 不用相等
        mid = Math.floor((end - start) / 2) + start;
        // 确定返回——只出现一次，左右不相等
        /*if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) {
            return nums[mid];
        }*/
        // 移动start end——重复2两次，mid偶数mid + 1比较，mid奇数与mid - 1比较
        const isOddNumber = mid % 2;
        if (isOddNumber) {
            if (nums[mid] === nums[mid - 1]) {
                start = mid + 1;
            } else {
                end = mid; // mid有可能就是要找的值
            }
        } else {
            if (nums[mid] === nums[mid + 1]) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
    }
    return nums[start];
    /*var singleNonDuplicate = function(nums) {
        let low = 0, high = nums.length - 1;
        while (low < high) {
            const mid = Math.floor((high - low) / 2) + low;
            // 在两个二进制位不同时返回1，相同时返回0
            if (nums[mid] === nums[mid ^ 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nums[low];
    };*/
    
};
// @lc code=end

