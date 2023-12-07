//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    let start = 0, maxLength = 0, charFrequency = {};
    for (let end = 0; end < fruits.length; end++) {
        if (!(fruits[end] in charFrequency)) {
            charFrequency[fruits[end]] = 0;
        }
        charFrequency[fruits[end]]++;
        while (Object.keys(charFrequency).length > 2) {
            charFrequency[fruits[start]]--;
            if (charFrequency[fruits[start]] === 0) {
                delete charFrequency[fruits[start]];
            }
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};
//leetcode submit region end(Prohibit modification and deletion)
