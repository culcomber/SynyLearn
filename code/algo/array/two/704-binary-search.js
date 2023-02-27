// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1; // 定义target在左闭右闭的区间里，[left, right]
    while (left <= right) { // // 当left==right，区间[left, right]依然有效，所以用 <=
        let result = Math.floor((right + right) / 2);
        if (nums[result] < target) {
            left = result + 1; // target 在左区间，所以[left, middle - 1]
        } else if (nums[result] > target) {
            right = result - 1; // target 在右区间，所以[middle + 1, right]
        } else if (nums[result] === target) {
            return result;
        }
    }
    return -1;
};
let nums = [-1,0,3,5,9,12], target = 9;
console.log(search(nums, target));

var search1 = function(nums, target) {
    // right是数组最后一个数的下标，num[right]在查找范围内，是左闭右闭区间
    let mid, left = 0, right = nums.length - 1;
    // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
    while (left <= right) {
        // 位运算 + 防止大数溢出
        mid = left + ((right - left) / 2); // 防止溢出 等同于(left + right)/2
        // 如果中间数大于目标值，要把中间数排除查找范围，所以右边界更新为mid-1；如果右边界更新为mid，那中间数还在下次查找范围内
        if (nums[mid] > target) {
            right = mid - 1;  // 去左面闭区间寻找
        } else if (nums[mid] < target) {
            left = mid + 1;   // 去右面闭区间寻找
        } else {
            return mid;
        }
    }
    return -1;
};