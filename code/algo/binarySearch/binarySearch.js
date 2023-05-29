/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function(nums, target) {
    let left = 0, right = nums.length - 1, mid;
    while (left <= right) {
        mid = Math.floor((right - left) / 2 + left);
        if (target < nums[mid]) {
            right = mid - 1;
        } else if(target > nums[mid]) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
};

console.log(search([1, 2, 3, 4, 5, 6], 3));