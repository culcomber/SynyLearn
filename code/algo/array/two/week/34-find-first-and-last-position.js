// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]

// 一：target 在数组范围的右边或者左边，例如数组{3, 4, 5}，target为2或者数组{3, 4, 5},target为6，此时应该返回{-1, -1}
// 二：target 在数组范围中，且数组中不存在target，例如数组{3,6,7},target为5，此时应该返回{-1, -1}
// 三：target 在数组范围中，且数组中存在target，例如数组{3,6,7},target为6，此时应该返回{1, 1}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const searchLeftRange = function(nums, target) {
        let left = 0, right = nums.length - 1, result = -2;
        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
            if (nums[mid] >= target) {

                right = mid - 1;
                result = right;
            } else {
                left = mid + 1;
                /*result = left;*/
            }
        }
        return result;
    }

    const searchRightRange = function(nums, target) {
        let left = 0, right = nums.length - 1, result = -2;
        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
            if (nums[mid] <= target) {

                left = mid + 1;
                result = left;
            } else {
                right = mid - 1;
                /*result = right;*/
            }
        }
        return result;
    }

    const leftIndex = searchLeftRange(nums, target);
    const rightIndex = searchRightRange(nums, target);
    if(leftIndex === -2 || rightIndex === -2) return [-1,-1];
    if (rightIndex - leftIndex > 1) return [leftIndex + 1, rightIndex - 1];
    return [-1, -1];
}

let nums = [5,7,7,8,8,10], target = 8;
// let nums = [1], target = 1;
console.log(searchRange(nums, target));