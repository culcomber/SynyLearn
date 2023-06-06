/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let result = [-1, -1];
    result[0] = search_index(nums, target, false);
    if (result[0] !== -1) {
        result[1] = search_index(nums, target, true);
    }
    return result;
};

function search_index(nums, target, findMax) {
    let keyIndex = -1; // 保存返回值
    let start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (target > nums[mid]) {
            start = mid + 1;
        } else if (target < nums[mid]) {
            end = mid - 1;
        } else {
            keyIndex = mid; // 在等于时更新
            if (findMax) {
                start = mid + 1; // 最后start会收束在刚好大于target
            } else {
                end = mid - 1; // 最后end会收束在刚好小于target
            }
        }
    }
    return keyIndex;
}
// @lc code=end

