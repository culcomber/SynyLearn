/*
 * @lc app=leetcode.cn id=658 lang=javascript
 *
 * [658] 找到 K 个最接近的元素
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
    let right = binarySearch(arr, x);
    let left = right - 1;
    while (k-- > 0) {
        // 处理边界
        if (left < 0) {
            right++;
        } else if (right >= arr.length) {
            left--;
        // 整数 a 比整数 b 更接近 x 需要满足|a - x| == |b - x| 且 a < b
        } else if (x - arr[left] <= arr[right] - x) {
            left--;
        } else {
            right++;
        }
    }
    const ans = [];
    for (let i = left + 1; i < right; i++) {
        ans.push(arr[i]);
    }
    return ans;
}

const binarySearch = (arr, x) => {
    let start = 0, end = arr.length - 1, mid;
    while (start <= end) {
        mid = Math.floor((end - start) / 2) + start;
        if (arr[mid] <= x) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;
}
// @lc code=end

