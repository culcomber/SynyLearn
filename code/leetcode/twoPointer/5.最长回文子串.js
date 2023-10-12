/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // 假设每个index都可能为中心，从中心向两边扩散
    let res = '';
    for (let i = 0; i < s.length; i++) {
        const str1 = palindrome(s, i, i);
        const str2 = palindrome(s, i, i + 1);
        res = res.length > str1.length ? res : str1;
        res = res.length > str2.length ? res : str2;
    }
    return res;
};

function palindrome(s, left, right) {
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
        left--;
        right++;
    }
    return s.substring(left + 1, right);
}

/* var longestPalindrome = function(s) {
    var res = "";
    for (var i = 0; i < s.length; i++) {
        // 以 s[i] 为中心的最长回文子串 回文子串长度是奇数
        var s1 = palindrome(s, i, i);
        // 以 s[i] 和 s[i+1] 为中心的最长回文子串 回文子串长度是偶数
        var s2 = palindrome(s, i, i + 1);
        // res = longest(res, s1, s2)
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }
    return res;
};

// 从中间向两边扩散
function palindrome(s, left, right) {
    while (left >= 0 && right < s.length && s[left] == s[right]) {
        left--;
        right++;
    }
    return s.substring(left + 1, right);
}

var longestPalindrome = function(s) {
    if (s.length < 2){
         return s
     }
     let l=0;
     let r=0
     for (let i = 0; i < s.length; i++) {
         // 回文子串长度是奇数
         helper(i, i)
         // 回文子串长度是偶数
         helper(i, i + 1) 
     }

     function helper(m, n) {
         while (m >= 0 && n < s.length && s[m] == s[n]) {
             m--
             n++
         }
         // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻 如果此轮询得到回文串长度大于之前记录， 记录此轮循边界
         if (n - m - 1 > r-l-1) {
            r=n
            l=m
         }
     }
     return s.slice(l+1, r)
}; */

// @lc code=end

