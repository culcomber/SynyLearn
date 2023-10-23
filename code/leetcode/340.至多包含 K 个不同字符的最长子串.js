/*
 * @lc app=leetcode.cn id=340 lang=javascript
 *
 * [340] 至多包含 K 个不同字符的最长子串
 */
// @lc code=start
/**
 * @param {string} str
 * @param {number} k
 * @return {number}
 */
var minSubArrayLen = function (str, k) {
    let start = 0, maxLength = 0, charFrequency = {};
    for (let end = 0; end < str.length; end++) {
        if (!(str[end] in charFrequency)) {
            charFrequency[str[end]] = 0;
        }
        charFrequency[str[end]]++;
        while (Object.keys(charFrequency).length > k) {
            charFrequency[str[start]]--;
            if (charFrequency[str[start]] === 0) {
                delete charFrequency[str[start]];
            }
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};

console.log('hello')
console.log(minSubArrayLen('araaci', 2));
console.log(minSubArrayLen('araaci', 1));
console.log(minSubArrayLen('cbbeci', 3));
