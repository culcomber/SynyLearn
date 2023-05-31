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
console.log('search');
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
console.log('binary_search');
console.log(binary_search([4, 6, 10], 10));
console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5));
console.log(binary_search([10, 6, 4], 10));
console.log(binary_search([10, 6, 4], 4));

// Ceiling of a Number (medium)
// start会比key大，end会比key小
// 找到有序数组中大于等于给定key的index
function search_ceiling_of_a_number(arr, key) {
    const n = arr.length;
    if (key > arr[n - 1]) {
        return -1;
    } // 情况一：没有符合
    let start = 0, end = n -1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start)
        if (key < arr[mid]) {
            end = mid - 1;
        } else if (key > arr[mid]) {
            start = mid + 1;
        } else {
            return mid; // 情况二：刚好等于
        }
    }
    return start; // 情况三：不大于
}
console.log('search_ceiling_of_a_number');
console.log(search_ceiling_of_a_number([4, 6, 10], 6));
console.log(search_ceiling_of_a_number([1, 3, 8, 10, 15], 12));
console.log(search_ceiling_of_a_number([4, 6, 10], 17));
console.log(search_ceiling_of_a_number([4, 6, 10], -1));

// 找到有序数组中小于给定key的index
function search_floor_of_a_number(arr, key) {
    if (key < arr[0]) {
        return -1;
    }
    let start = 0, end = arr.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (key < arr[mid]) {
            end = mid - 1;
        } else if (key > arr[mid]) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return end;
}
console.log('search_floor_of_a_number');
console.log(search_floor_of_a_number([4, 6, 10], 6));
console.log(search_floor_of_a_number([1, 3, 8, 10, 15], 12));
console.log(search_floor_of_a_number([4, 6, 10], 17));
console.log(search_floor_of_a_number([4, 6, 10], -1));

// Next Letter (medium)
/*Example 1:
Input: ['a', 'c', 'f', 'h'], key = 'f'
Output: 'h'
Explanation: The smallest letter greater than 'f' is 'h' in the given array.

Example 2:
Input: ['a', 'c', 'f', 'h'], key = 'b'
Output: 'c'
Explanation: The smallest letter greater than 'b' is 'c'.

Example 3:
Input: ['a', 'c', 'f', 'h'], key = 'm'
Output: 'a'
Explanation: As the array is assumed to be circular, the smallest letter greater than 'm' is 'a'.

Example 4:
Input: ['a', 'c', 'f', 'h'], key = 'h'
Output: 'a'
Explanation: As the array is assumed to be circular, the smallest letter greater than 'h' is 'a'.*/

/*[0, 1, 2, 3, 4] start=0 end=4 mid=2 key=2
找大于，循环往右走，start=3 end=4 mid=3 --> start=3 end=2 start3刚好大于key2
找小于，循环往左走，start=0 end=1 mid=0 --> start=1 end=1 mid=1 --> start=2 end=1 end1刚好大于key2*/

// 找到有序数组中大于给定key的值，没有等于，等于后循环要走下去，如果没有就返回数组第一个值
function search_next_letter(letters, key) {
    const n = letters.length;
    if (key < letters[0] || key >= letters[n - 1]) {
        return letters[0];
    }
    let start = 0, end = n - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (key >= letters[mid]) {
            start = mid + 1;
        } else {
            end = end - 1;
        }
    }
    return letters[start];
    // return letters[start % n];
    // [0, 1, 2, 3, 4] key>=4 start都是5 start%n就是0
}
console.log('search_next_letter');
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'f'));
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'b'));
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'm'));

// 找到有序数组中小于给定key的值，没有等于，等于后循环要走下去，如果没有就返回数组第一个值
function search_before_letter(letters, key) {
    const n = letters.length;
    if (key <= letters[0] || key > letters[n - 1]) {
        return letters[n - 1]
    }

    let start = 0, end = n - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (key <= letters[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return letters[end]
}
console.log('search_before_letter');
console.log(search_before_letter(['a', 'c', 'f', 'h'], 'f'));
console.log(search_before_letter(['a', 'c', 'f', 'h'], 'b'));
console.log(search_before_letter(['a', 'c', 'f', 'h'], 'm'));

// Number Range (medium)
// 数组里面有重复，找到重复的范围
/*Example 1:
Input: [4, 6, 6, 6, 9], key = 6
Output: [1, 3]

Example 2:
Input: [1, 3, 8, 10, 15], key = 10
Output: [3, 3]

Example 3:
Input: [1, 3, 8, 10, 15], key = 12
Output: [-1, -1]*/

// Next Letter的结合，需要往左找到刚好小于key的end，往右找到刚好大于key的start
function find_range(arr, key) {
    let result = [-1, -1];
    result[0] = binary_search_range(arr, key, false);
    if (result[0] !== -1) {
        result[1] = binary_search_range(arr, key, true)
    }
    return result;
}

function binary_search_range(arr, key, findMaxIndex) {
    let keyIndex = -1;
    let start = 0, end = arr.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2 + start);
        if (key < arr[mid]) {
            end = mid - 1
        } else if (key > arr[mid]) {
            start = mid + 1;
        } else {
            keyIndex = mid; // 只有找到key情况下keyIndex才会变
            if (findMaxIndex) {
                // search ahead to find the last index of 'key'
                start = mid + 1;
            } else {
                // search behind to find the first index of 'key'
                end = end - 1;
            }
        }
    }
    return keyIndex;
}
console.log('find_range');
console.log(find_range([4, 6, 6, 6, 9], 6));
console.log(find_range([1, 3, 8, 10, 15], 10));
console.log(find_range([1, 3, 8, 10, 15], 12));

// Search in a Sorted Infinite Array (medium)


















