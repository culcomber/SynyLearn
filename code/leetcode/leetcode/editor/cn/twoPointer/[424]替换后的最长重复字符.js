//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let start = 0, maxLen = 0, maxRepeatLetters = 0, frequencyMap = {};
    for (let end = 0; end < s.length ; end++) {
        // 前置处理判断条件
        const rightChar = s[end];
        if (!(rightChar in frequencyMap)) {
            frequencyMap[rightChar] = 0;
        }
        frequencyMap[rightChar]++;
        maxRepeatLetters = Math.max(maxRepeatLetters, frequencyMap[rightChar]);
        // 移动窗口
        if (end - start + 1 - maxRepeatLetters > k) {
            const leftChar = s[start];
            frequencyMap[leftChar]--;
            start++;
        }
        // 处理返回结果
        maxLen = Math.max(maxLen, end - start + 1)
    }
    return maxLen;
};

characterReplacement('AABCA', 1)
//leetcode submit region end(Prohibit modification and deletion)
