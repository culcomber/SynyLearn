/* 查找数组中K个数平均值
Array: [1, 3, 2, 6, -1, 4, 1, 8, 2], K=5
(1+3+2+6−1)/5=>2.2 (3+2+6−1+4)/5=>2.8 (2+6−1+4+1)/5=>2.4 ...
Output: [2.2, 2.8, 2.4, 3.6, 2.8]
*/
// 将五个连续子数组堪称一个长度为5的滑动窗口
function find_average_of_subarrays(k, arr) {
    // 返回结果 累加结果 开始 结尾
    let result = [], sum = 0, start = 0, end = 0;
    while (end < arr.length) {
        sum += arr[end];
        if (end >= k - 1) { // 窗口开始移动
            result.push(sum / k); // 结果值保存
            sum -= arr[start]; // 重新计算窗口值
            start++; // 移动start
        }
        end++;
    }
    return result;
}
console.log('find_average_of_subarrays');
console.log(find_average_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]));


/* 1 Maximum Sum Subarray of Size K (easy)
给定一个正数数组和一个正数k，求任意大小为k的连续子数组的最大和。
Example 1:
Input: [2, 1, 5, 1, 3, 2], k=3
Output: 9
Explanation: Subarray with maximum sum is [5, 1, 3].

Example 2:
Input: [2, 3, 4, 1, 5], k=2
Output: 7
Explanation: Subarray with maximum sum is [3, 4].*/
function max_sub__array_of_size_k(k, arr) {
    let result = 0, sum = 0, start = 0, end = 0;
    while (end < arr.length) {
        sum += arr[end];
        if (end >= k - 1) {
          result = Math.max(result, sum); // 和0的区别，返回结果不一样（0平均值数组 最大值），求解过程是一样的
          sum -= arr[start];
          start++;
        }
        end++;
    }
    return result;
}
console.log('max_sub__array_of_size_k');
console.log(max_sub__array_of_size_k(3, [2, 1, 5, 1, 3, 2,]));
console.log(max_sub__array_of_size_k(2, [2, 3, 4, 1, 5]));

/*2 Smallest Subarray with a given sum (easy)
求和大于等于' S '的最小连续子数组的长度
Example 1:
Input: [2, 1, 5, 2, 3, 2], S=7
Output: 2
Explanation: The smallest subarray with a sum great than or equal to '7' is [5, 2].

Example 2:
Input: [2, 1, 5, 2, 8], S=7
Output: 1
Explanation: The smallest subarray with a sum greater than or equal to '7' is [8].

Example 3:
Input: [3, 4, 1, 1, 6], S=8
Output: 3
Explanation: Smallest subarrays with a sum greater than or equal to '8' are [3, 4, 1] or [1, 1, 6].*/
// 窗口宽度不确定，1 sum先增加到大于等于target，2 此时尝试缩小窗口(移动start)，直到sum先小于target，重复1 2









