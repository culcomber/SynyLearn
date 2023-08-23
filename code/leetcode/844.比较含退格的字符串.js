/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
    /* 一个字符是否会被删掉，只取决于该字符后面的退格符，而与该字符前面的退格符无关。
    因此当我们逆序地遍历字符串，就可以立即确定当前字符是否会被删掉。
    多个#收集，直到遇到字符 */

    /* let i = S.length - 1,
    j = T.length - 1,
    skipS = 0,
    skipT = 0;
    // 大循环
    while(i >= 0 || j >= 0){
        // S 循环
        while(i >= 0){
            if(S[i] === '#'){
                skipS++;
                i--;
            } else if (skipS > 0){
                skipS--;
                i--;
            } else break;
        }

        // T 循环
        while(j >= 0){
            if (T[j] === '#'){
                skipT++;
                j--;
            } else if (skipT > 0){
                skipT--;
                j--;
            } else break;
        }

        if(S[i] !== T[j]) return false;
        i--;
        j--;
    }
    return true; */

    // 第一次 参考
    // 从后面开始遍历，因为字母是否删除和后面的#相关，只有直到后面有多少#才知道前面有多少字母要删除
    /* let i = S.length - 1,
    j = T.length - 1,
    skipS = 0, // 保存跳过#数量
    skipT = 0;
    while(j >= 0 || i >= 0) {
        // S 循环
        while(i >= 0){
            if(S[i] === '#'){
                skipS++;
                i--;
            } else if (skipS > 0){
                skipS--;
                i--;
            } else break;
        }

        // T 循环
        while(j >= 0) {
            if(T[j] === '#') {
                skipT++;
                j--;
            } else if(skipS > 0) {
                skipT--;
                i--;
            } else break;
        }

        // 如果S和T相同，那么字串也是相同的
        if(S[i] !== T[j]) return false;
        i--;
        j--;
    }
    return true;  */

    // 第二次
    let skipS = 0, skipT = 0, i = S.length - 1, j = T.length - 1;
    while(i >= 0 && j >= 0) {
        // 处理#
        while(skipS > 0 && i >= 0) {
            if(S[i] === '#') {
                skipS++;
                i--;
            } else {
                skipS--;
                i--;
            }
        }

        while(skipT > 0 && j >= 0) {
            if(T[j] === '#') {
                skipT++;
                j--;
            } else {
                skipT--;
                j--;
            }
        }

        // 要先处理#
        console.log(S[i], T[j]);
        if(S[i] !== T[j]) {
            return false;
        }
        i--;
        j--;
    }
    return true;
};

backspaceCompare('ab#c', 'ad#c')

// js 不能修改字符串
function handleBackSpace(str) {
    let slow = 0;
    /* str.split('')
        [...str]
        Array.from(str)
        Object.assign([], str)
        for loop 和 array.push()
        Array.prototype.slice.call(str) */
    let strArray = [...str];
    for (let fast = 0; fast < strArray.length; fast++) {
        if (strArray[fast] === '#') {
            slow--;
        } else {
            strArray[slow++] = strArray[fast];
        }
    }
    console.log(slow, strArray);
    // slice(0,slow) 截取[0, slow) splice(0, slow) 从0开始截取slow个
    // join() toString()
    return strArray.splice(0, slow).toString();
}
// @lc code=end

