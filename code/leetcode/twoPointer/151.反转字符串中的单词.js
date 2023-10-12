/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 反转字符串中的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // 字符串转数组
    const strArr = Array.from(s);
    // 1 去除多余的空格和末尾的空格
    removeExtraSpaces(strArr);
    // 2 反转全部字母
    reverseStr(strArr, 0, strArr.length - 1);
    // 3 反转单词
    let wordStart = 0;
    for (let i = 0; i <= strArr.length; i++) {
        // 最后单词处理
        if (strArr[i] === ' ' || i === strArr.length) {
            reverseStr(strArr, wordStart, i - 1);
            wordStart = i + 1;
        }
    }
    // 数组转字符串
    return strArr.join('');
};

// 去除多余的空格和末尾的空格
function removeExtraSpaces(strArr) {
    let slow = 0; // 慢指针，保留最新非连续空格的值
    for (let i = 0; i < strArr.length; i++) {
        // 当前和前面都是空格，删除当前空格，当i=0，没有前面，特殊处理
        if (!(strArr[i] === ' ' && (strArr[i - 1] === ' ' || i === 0))) {
            strArr[slow++] = strArr[i];
        }
    }
    // 去除尾部空格
    strArr.length = strArr[slow - 1] === ' ' ? slow - 1 : slow;
}

// 反转字符串数组
function reverseStr(strArr, start, end) {
    let left = start, right = end;
    while (left < right) {
        [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
        left++;
        right--;
    }
}

/* var reverseWords = function(s) {
    // 字符串转数组
    const strArr = Array.from(s);
    // 移除多余空格
    removeExtraSpaces(strArr);
    // 翻转
    reverse(strArr, 0, strArr.length - 1);
 
    let start = 0;
 
    for(let i = 0; i <= strArr.length; i++) {
      if (strArr[i] === ' ' || i === strArr.length) {
        // 翻转单词
        reverse(strArr, start, i - 1);
        start = i + 1;
      }
    }
 
    return strArr.join('');
 };
 
 // 删除多余空格
 function removeExtraSpaces(strArr) {
   let slowIndex = 0;
   let fastIndex = 0;
 
   while(fastIndex < strArr.length) {
     // 移除开始位置和重复的空格
     if (strArr[fastIndex] === ' ' && (fastIndex === 0 || strArr[fastIndex - 1] === ' ')) {
       fastIndex++;
     } else {
       strArr[slowIndex++] = strArr[fastIndex++];
     }
   }
 
   // 移除末尾空格
   strArr.length = strArr[slowIndex - 1] === ' ' ? slowIndex - 1 : slowIndex;
 }
 
 // 翻转从 start 到 end 的字符
 function reverse(strArr, start, end) {
   let left = start;
   let right = end;
 
   while(left < right) {
     // 交换
     [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
     left++;
     right--;
   }
 } */
// @lc code=end

