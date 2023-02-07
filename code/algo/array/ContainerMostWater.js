// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
let height = [1,1];
// 方法一：枚举所有可能
/**
 * @param {number[]} height
 * @return {number}
 */
function twoLoop(height) {
    let result = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i+1; j < height.length; j++) {
            const area = (j - i) * Math.min(height[j], height[i]);
            result = Math.max(result, area);
        }
    }
    return result;
};
// 方法二：一次遍历
function oneLoop(height) {
    let result = 0;
    for (let i = 0,j = height.length - 1; i < j; ) {
        height[i] > height[j] ? j-- : i++;
        const area = (j - i) * Math.min(height[j], height[i]);
        result = Math.max(result, area);
    }
    return result;
};

console.log(oneLoop(height));
console.log(twoLoop(height));