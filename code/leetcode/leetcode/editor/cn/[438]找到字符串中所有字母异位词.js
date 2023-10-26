//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let start = 0, matched = 0, charFrequency = {}, resultIndex = [];
    for (let i = 0; i < p.length; i++) {
        const chr = p[i];
        if (!(chr in charFrequency)) {
            charFrequency[chr] = 0;
        }
        charFrequency[chr]++;
    }
    for (let end = 0; end < s.length; end++) {
        // 参考变量处理
        const rightChar = s[end];
        if (rightChar in charFrequency) {
            charFrequency[rightChar]--;
            if (charFrequency[rightChar] === 0) {
                matched++;
            }
        }
        // 结果处理
        if (matched === Object.keys(charFrequency).length) {
            resultIndex.push(start);
        }
        // 收缩窗口
        if (end >= p.length - 1) {
            const leftChar = s[start];
            if (leftChar in charFrequency) {
                if (charFrequency[leftChar] === 0) {
                    matched--;
                }
                charFrequency[leftChar]++;
            }
            start++;
        }
    }
    return resultIndex;
};

findAnagrams('cbaebabacd', 'abc')
//leetcode submit region end(Prohibit modification and deletion)
