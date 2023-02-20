// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123。

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] === 9) {
            digits[i] = 0;
        } else {
            digits[i] += 1;
            return digits;
        }
    }
    const ans = new Array(digits.length + 1).fill(0);
    ans[0] = 1;
    return ans;
};

console.log(plusOne([1,2,3]));