/*
 * @lc app=leetcode.cn id=713 lang=javascript
 *
 * [713] 乘积小于 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    // 二分查找
    /* if (k === 0) {
        return 0;
    }
    const n = nums.length;
    const logPrefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        logPrefix[i + 1] = logPrefix[i] + Math.log(nums[i]);
    }
    const logk = Math.log(k);
    let ret = 0;
    for (let j = 0; j < n; j++) {
        let l = 0;
        let r = j + 1;
        let idx = j + 1;
        const val = logPrefix[j + 1] - logk + 1e-10;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (logPrefix[mid] > val) {
                idx = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        ret += j + 1 - idx;
    }
    return ret; */

    // 双指针
    /* let n = nums.length, ret = 0;
    let prod = 1, i = 0;
    for (let j = 0; j < n; j++) {
        prod *= nums[j];
        while (i <= j && prod >= k) {
            prod /= nums[i];
            i++;
        }
        ret += j - i + 1;
    }
    return ret; */

    let result = 0, prod = 1, left = 0;
    for (let right = 0; right < nums.length; right++) {
        prod *= nums[right];
        while (prod >= k && left <= right){
            prod /= nums[left];
            left++;
        }
        // right往前到left 10 5 2 6 
        // left=0 right=0 [10]
        // left=0 right=1 [5][10, 5]
        // left=0 right=2 乘积大于等于target 移动left
        // left=1 right=2 [2][5, 2]
        // left=1 right=3 [6][2, 6][5, 2, 6] // right是6 left是5 [2][5, 2]在right是2登记了 [5]right是5登记了
        result += right - left + 1;
    }
    return result;
};
// @lc code=end

