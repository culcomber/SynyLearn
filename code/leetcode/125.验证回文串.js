/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    /* s = s.toUpperCase();
    let i = 0, j = s.length - 1;
  
    while (i < j) {
      if (!isValid(s[i])) {
        i++;
        continue;
      }
      if (!isValid(s[j])) {
        j--;
        continue;
      }
      if (s[i] != s[j]) {
        return false;
      }
      i++;
      j--;
    }
    return true; */

    /* s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();

    let [left, right] = [0, s.length - 1];
    while (left < right) {
      if(s[left++] !== s[right--]) return false;
    }
  
    return true; */

    // 处理字符串
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    let left = 0, right = s.length - 1;
    while(left < right) {
        if(s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
  };
  
  var isValid = function (c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
  };
// @lc code=end

