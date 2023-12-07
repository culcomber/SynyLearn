//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // charFrequency是对象
    let start = 0, matched = 0, charFrequency = {},
        minLen = s.length + 1, subStart = 0;
    for (let i = 0; i < t.length; i++) {
        const chr = t[i];
        if (!(chr in charFrequency)) {
            charFrequency[chr] = 0;
        }
        charFrequency[chr]++;
    }
    // 先找到包含所有要匹配的字母，然后缩小窗口
    for (let end = 0; end < s.length; end++) {
        const rightChar = s[end];
        if (rightChar in charFrequency) {
            charFrequency[rightChar]--;
            // matched不用等某个字母为零才加一，matched匹配每个单词不匹配字母
            if (charFrequency[rightChar] >= 0) {
                matched++;
            }
        }
        // 缩小窗口 matched小于匹配串长度结束循环
        while (matched === t.length) {
            if (minLen > end - start + 1) {
                minLen = end - start + 1;
                subStart = start;
            }
            const leftChar = s[start];
            if (leftChar in charFrequency) {
                // 如果当前窗口的某个单词超过要匹配的字段，charFrequency[leftChar]就会是复数
                // 所以直到charFrequency[leftChar]归0，这时才减少matched，结束循环
                if (charFrequency[leftChar] === 0) {
                    matched--;
                }
                charFrequency[leftChar]++;
            }
            // 不要忘记加start
            start++;
        }
    }
    if (minLen > s.length) {
        return '';
    } else {
        return s.substring(subStart, subStart + minLen);
    }
};
//leetcode submit region end(Prohibit modification and deletion)
