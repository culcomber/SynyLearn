/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

let nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;

// 合并后，排序
function mergeSort(nums1, m, nums2, n) {
    // splice(start, deleteCount, item1, item2, itemN)
    nums1.splice(m, nums1.length, ...nums2);
    nums1.sort((a, b) => a - b);
    // nums1.sort();
    console.log(nums1);
};

// 双指针--前
function towFront(nums1, m, nums2, n) {
    let p1 = 0, p2 = 0;
    let sorted = new Array( m + n ).fill(0);
    let cur;
    while (p1 < m || p2 < n) {
        if (p1 === m) {
            cur = nums2[p2++];
        } else if (p2 === n) {
            cur = nums1[p1++];
        } else if (nums1[p1] < nums2[p2]) { 
            cur = nums1[p1++];
        } else { 
            cur = nums2[p2++];
        }
        sorted[p1 + p2 - 1] = cur;
    }
    for (let i = 0; i < sorted.length; i++) {
        nums1[i] = sorted[i];
    }
    console.log(nums1);
};

// 双指针--后
function twoBack(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1;
    while (p1 >= 0 || p2 >= 0) {
        if (p1 === -1) {
            nums1[p1 + p2 + 1] = nums2[p2--]
        } else if (p2 === -1) {
            nums1[p1 + p2 + 1] = nums1[p1--];
        } else if (nums1[p1] > nums2[p2]) { 
            nums1[p1 + p2 + 1] = nums1[p1--];
        } else { 
            nums1[p1 + p2 + 1] = nums2[p2--];
        }
    }
    console.log(nums1);
};

// mergeSort(nums1, m, nums2, n)
// towFront(nums1, m, nums2, n)
twoBack(nums1, m, nums2, n)