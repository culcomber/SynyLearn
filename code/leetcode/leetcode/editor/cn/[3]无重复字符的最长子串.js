//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let start = 0, maxLength = 0, chatIndexMap = {};
    for (let end = 0; end < s.length; end++) {
        const currentStr = s[end];
        if (currentStr in chatIndexMap) {
            start = Math.max(start, chatIndexMap[currentStr] + 1);
        }
        chatIndexMap[currentStr] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};
//leetcode submit region end(Prohibit modification and deletion)
