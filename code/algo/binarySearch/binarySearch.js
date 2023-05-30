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

// Order-agnostic Binary Search (easy)
function binary_search(arr, key) {
    let start = 0, end = arr.length - 1, mid;
    let isAscending = arr[start] < arr[end];
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (arr[mid] === key) {
            return mid;
        }
        if (isAscending) {
            if (arr[mid] < key) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        } else {
            if (arr[mid] > key) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
}

console.log(binary_search([4, 6, 10], 10));
console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5));
console.log(binary_search([10, 6, 4], 10));
console.log(binary_search([10, 6, 4], 4));




















