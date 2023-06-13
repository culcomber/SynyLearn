/* 1 查找数组中K个数平均值
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


/* 2 Maximum Sum Subarray of Size K (easy)
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

/* 3 Smallest Subarray with a given sum (easy)
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
//  similar 2  Maximum Sum Subarray of Size K.
var minSubArrayLen = function(target, nums) {
    let start, end
    start = end = 0
    let sum = 0
    let len = nums.length
    let ans = Infinity

    while(end < len){
        sum += nums[end];
        while (sum >= target) { // 有可能end远大于start的值，start要移动很多位
            ans = Math.min(ans, end - start + 1);
            sum -= nums[start];
            start++;
        }
        end++;
    }
    return ans === Infinity ? 0 : ans
};

/*4 Longest Substring with K Distinct Characters (medium)
给定一个字符串，找出其中最长的子字符串的长度，且不超过K个不同的字符
Example 1:
Input: String="araaci", K=2
Output: 4
Explanation: The longest substring with no more than '2' distinct characters is "araa".

Example 2:
Input: String="araaci", K=1
Output: 2
Explanation: The longest substring with no more than '1' distinct characters is "aa".

Example 3:
Input: String="cbbebi", K=3
Output: 5
Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".
*/
// similar 3 Smallest Subarray with a given sum
function longest_substring_with_k_distinct(str, k) {
    let maxLength = 0, charFrequency = {}, start = 0;
    for (let end = 0; end < str.length; end++) {
        // end字母是否在charFrequency，在的话加1，不在把字母添加到charFrequency
        const rightChar = str[end];
        if (!(rightChar in charFrequency)) {
            charFrequency[rightChar] = 0;
        }
        charFrequency[rightChar]++;
        // charFrequency里面字母大于k，开始缩小窗口，有可能aaacb，k=2，要用循环直到charFrequency小于等于k
        while (Object.keys(charFrequency).length > k) {
            const leftChar = str[start];
            charFrequency[leftChar]--;
            if (charFrequency[leftChar] === 0) {
                delete charFrequency[leftChar];
            }
            start++;
        }
        // 上面处理charFrequency里面字母大于k，不符合要求，处理后才是答案
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
}
console.log('longest_substring_with_k_distinct');
console.log(longest_substring_with_k_distinct('araaci', 2));
console.log(longest_substring_with_k_distinct('araaci', 1));
console.log(longest_substring_with_k_distinct('cbbebi', 3));

/*5 Fruits into Baskets (medium)
给定一个字符数组，其中每个字符代表一棵果树，给你两个篮子，你的目标是在每个篮子里放最多数量的水果。 唯一的限制是每个篮子只能有一种水果。
你可以从任何一棵树开始，但一旦你开始了，你就不能跳过一棵树。
Example 1:
Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']

Example 2:
Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
Explanation: We can put 3 'B' in one basket and two 'C' in the other basket.
This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']
*/
// 与4 Longest Substring with K Distinct Characters (medium)相同，只是k=2
// while (Object.keys(charFrequency).length > k) { 改成 while (Object.keys(charFrequency).length > 2) {

/*6 No-repeat Substring (hard)
给定一个字符串，找出不包含重复字符的最长子字符串的长度。
Example 1:
Input: String="aabccbb"
Output: 3
Explanation: The longest substring without any repeating characters is "abc".

Example 2:
Input: String="abbbb"
Output: 2
Explanation: The longest substring without any repeating characters is "ab".

Example 3:
Input: String="abccde"
Output: 3
Explanation: Longest substrings without any repeating characters are "abc" & "cde".
*/
// similar 4 Longest Substring with K Distinct Characters
function non_repeat_substring(str) {
    let maxLenght = 0, charIndexMap = {}, windowStart = 0;
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const rightChar = str[windowEnd];
        if (rightChar in charIndexMap) {
            windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
        }
        charIndexMap[rightChar] = windowEnd;
        maxLenght = Math.max(maxLenght, windowEnd - windowStart + 1);
    }
    return maxLenght;
}
console.log('non_repeat_substring');
console.log(non_repeat_substring('aabccbb'));
console.log(non_repeat_substring('abbbb'));
console.log(non_repeat_substring('abccde'));

/*7 Longest Substring with Same Letters after Replacement (hard)
可以替换k个字母，得到最长的相同字母的子串
Example 1:
Input: String="aabccbb", k=2
Output: 5
Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb".

Example 2:
Input: String="abbcb", k=1
Output: 4
Explanation: Replace the 'c' with 'b' to have a longest repeating substring "bbbb".

Example 3:
Input: String="abccde", k=1
Output: 3
Explanation: Replace the 'b' or 'd' with 'c' to have the longest repeating substring "ccc".
*/
// 替换k个值，k个不同字母（字母可以重复）
// similar 6 No-repeat Substring
function length_of_longest_substring(str, k) {
    let maxLength = 0, frequencyMap = {}, maxRepeatLetterCount = 0, windowStart = 0;
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const rightChar = str[windowEnd];
        if (!(rightChar in frequencyMap)) {
            frequencyMap[rightChar] = 0;
        }
        frequencyMap[rightChar]++;
        // 当前窗口最大重复字母长度
        maxRepeatLetterCount = Math.max(maxRepeatLetterCount, frequencyMap[rightChar]);
        // 可替代值大于k，需要缩小窗口
        if (windowEnd - windowStart + 1 - maxRepeatLetterCount > k) {
            const leftChar = str[windowStart];
            frequencyMap[leftChar]--;
            windowStart++;
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}
console.log('length_of_longest_substring');
console.log(length_of_longest_substring('aabccbb', 2));
console.log(length_of_longest_substring('abbcb', 1));
console.log(length_of_longest_substring('abccde', 1));

/*8 Longest Subarray with Ones after Replacement (hard)
只有0/1数组，替换k个0为1，找到最长1的子串
Example 1:
Input: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
Output: 6
Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.

Example 2:
Input: Array=[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], k=3
Output: 9
Explanation: Replace the '0' at index 6, 9, and 10 to have the longest contiguous subarray of 1s having length 9.
*/
// similar to 7 Longest Substring with same Letters after Replacement
function length_of_longest_substring_01array(arr, k) {
    let maxLength = 0, maxOneCount = 0, windowStart = 0;
    for (var windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        // end更新1的最大数量
        if (arr[windowEnd] === 1) {
            maxOneCount++;
        }
        if (windowEnd - windowStart + 1 - maxOneCount > k) {
            if (arr[windowStart] === 1) {
                maxOneCount--;
            }
            windowStart++;
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}
console.log('length_of_longest_substring');
console.log(length_of_longest_substring([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2));
console.log(length_of_longest_substring([0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], 3));

/*Problem Challenge 1 Permutation in a String (hard)
字符串是否包含给定Pattern（可以更改顺序）的字串
Example 1:
Input: String="oidbcaf", Pattern="abc"
Output: true
Explanation: The string contains "bca" which is a permutation of the given pattern.

Example 2:
Input: String="odicf", Pattern="dc"
Output: false
Explanation: No permutation of the pattern is present in the given string as a substring.

Example 3:
Input: String="bcdxabcdy", Pattern="bcdyabcdx"
Output: true
Explanation: Both the string and the pattern are a permutation of each other.

Example 4:
Input: String="aaacb", Pattern="abc"
Output: true
Explanation: The string contains "acb" which is a permutation of the given pattern.
*/
// similar 4 Longest Substring with K Distinct Characters
// 使用HashMap 保存 Pattern






