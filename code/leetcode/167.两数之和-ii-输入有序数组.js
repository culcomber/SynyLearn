/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    // 双指针
    /* let left = 0, right = numbers.length - 1;
    while (left < right) {
        if (numbers[left] + numbers[right] < target) {
            left++;
        } else if (numbers[left] + numbers[right] > target) {
            right--;
        } else {
            return [left + 1, right + 1];
        }

    }
    return []; */

    // Hash
    const numMap = new Map();
    for (let index = 0; index < numbers.length; index++) {
        const temp = target - numbers[index];
        if (numMap.get(temp)) {
            return [numMap.get(temp), index + 1] ;
        } else {
            numMap.set(numbers[index], index + 1)
        }
    }
    return [];
};
// @lc code=end

