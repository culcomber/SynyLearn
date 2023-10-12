/*
 * @lc app=leetcode.cn id=581 lang=javascript
 *
 * [581] 最短无序连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubnumsay = function(nums) {
    let low = 0, hight = nums.length - 1;
    //while(low < hight) {
        // 先找左边没有排序
        while(low < nums.length - 1 && nums[low] <= nums[low + 1]) {
            low++;
        }
        if(low === nums.length - 1) {
            return 0;
        }
        // 找右边没有排序的下标
        while(hight > 0 && nums[hight] >= nums[hight - 1]) {
            hight--;
        }
        // 找到非排序子序列中最大值和最小值
        let minNum = Infinity, maxNum = -Infinity;
        for (let i = low; i < hight + 1; i++) {
            minNum = Math.min(nums[i], minNum);
            maxNum = Math.max(nums[i], maxNum);
        }
        // 根据最小值和最大值扩展左右边界
        while(low > 0 && nums[low - 1] > minNum) {
            low--;
        }
        while(hight < nums.length - 1 && nums[hight + 1] < maxNum) {
            hight++;
        }
    //}
    return hight - low + 1;
};
console.log(findUnsortedSubnumsay([1,2,5,3,7,10,9,12]))

// @lc code=end

