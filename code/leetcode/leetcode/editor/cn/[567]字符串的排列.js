//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    // 窗口就是s1字串，当窗口大于s1字串长度就要缩小
    let start = 0, matched = 0, charFrequency = {};
    // 构建s1的map
    for (let i = 0; i < s1.length; i++) {
        const chr = s1[i];
        if (!(chr in charFrequency)) {
            charFrequency[chr] = 0;
        }
        charFrequency[chr]++;
    }
    for (let end = 0; end < s2.length; end++) {
        const rightChar = s2[end];
        if (rightChar in charFrequency) {
            charFrequency[rightChar]--;
            if (charFrequency[rightChar] === 0) {
                matched++;
            }
            // matched++;
        }
        // end - start + 1 > s1.length 可以简化，因为end > s1.length - 1时start和end会同时加1
        if (end > s1.length - 1) {
            const leftChar = s2[start];
            if (leftChar in charFrequency) {
                if (charFrequency[leftChar] === 0) {
                    matched--;
                }
                charFrequency[leftChar]++;
            }
            start++;
        }
        if (matched === Object.keys(charFrequency).length) {
            return true;
        }
        /*if (matched === s1.length) {
            return true;
        }*/
    }
    return false;
};

checkInclusion('hello', 'ooolleoooleh');
//leetcode submit region end(Prohibit modification and deletion)
