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
    const getLeftBorder = function(nums, target) {
        let left = 0, right = nums.length - 1, leftBorder = -2;
        while (left <= right) {
            let middle = left + Math.floor((right - left) / 2);
            if(nums[middle] < target){ 
                left = middle + 1;
            } else { // 寻找左边界，nums[middle] == target的时候更新right
                right = middle - 1;
                leftBorder = right;
            }
        }
        return leftBorder;
    }

    const getRightBorder = function(nums, target) {
        let left = 0, right = nums.length - 1, rightBorder= -2;
        while (left <= right) {
            let middle = left + Math.floor((right - left) / 2);
            if (nums[middle] > target) {
                right = middle - 1;
            } else { // 寻找右边界，nums[middle] == target的时候更新left
                left = middle + 1;
                rightBorder = left;
            }
        }
        return rightBorder;
    }

    let leftBorder = getLeftBorder(nums, target);
    let rightBorder = getRightBorder(nums, target);
    // 情况一
    if(leftBorder === -2 || rightBorder === -2) return [-1,-1];
    // 情况三
    if (rightBorder - leftBorder > 1) return [leftBorder + 1, rightBorder - 1];
    // 情况二
    return [-1, -1];
};
let nums = [5,7,7,8,8,10], target = 8;
console.log(searchRange(nums, target));