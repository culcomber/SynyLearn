/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    /* nums.sort((a, b) => a - b);
    const n = nums.length;
    let ans = 0;
    let minDiff = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n - 2; i++) {
        const x = nums[i];
        if (i > 0 && x === nums[i - 1]) {
            continue; // 优化三 需要跳过相同元素
        }

        // 优化一
        let s = x + nums[i + 1] + nums[i + 2];
        if (s > target) { // 后面无论怎么选，选出的三个数的和不会比 s 还小
            if (s - target < minDiff) {
                ans = s; // 由于下面直接 break，这里无需更新 minDiff
            }
            break;
        }

        // 优化二
        s = x + nums[n - 2] + nums[n - 1];
        if (s < target) { // x 加上后面任意两个数都不超过 s，所以下面的双指针就不需要跑了
            if (target - s < minDiff) {
                minDiff = target - s;
                ans = s;
            }
            continue;
        }

        // 双指针
        let j = i + 1, k = n - 1;
        while (j < k) {
            s = x + nums[j] + nums[k];
            if (s === target) {
                return target;
            }
            if (s > target) {
                if (s - target < minDiff) { // s 与 target 更近
                    minDiff = s - target;
                    ans = s;
                }
                k--;
            } else { // s < target
                if (target - s < minDiff) { // s 与 target 更近
                    minDiff = target - s;
                    ans = s;
                }
                j++;
            }
        }
    }
    return ans; */

    // 排序
    nums.sort((a, b) => a - b);
    // 因为是求最接近的值，需要额外参数维持这个差值
    let minDiff = Number.MAX_SAFE_INTEGER;
    let ans = 0;
    const numLength = nums.length;
    // 开始遍历数组
    for (let i = 0; i < numLength - 2; i++) {
        // 跳过重复
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        let addResult = nums[i] + nums[i + 1] + nums[i + 2];
        // 如果nums[i] + nums[i + 1] + nums[i + 2] > target 后面都会大于
        if (addResult > target) {
            if (addResult - target < minDiff) {
                ans = addResult;
            }
            break; // 不会有比nums[i]更小的数
        }

        addResult = nums[i] + nums[numLength - 1] + nums[numLength - 2];
        // 如果nums[i] + nums[numLength - 1] + nums[numLength - 2] < target 前面都会小于
        if (addResult < target) {
            if (target - addResult < minDiff) {
                minDiff = target - addResult ;
                ans = addResult;
            }
            continue; // 还会有比nums[i]更大的数
        }

        // 双指针找答案
        
        let left = i + 1, right = numLength - 1;
        while (left < right) {
            const addResult = nums[i] + nums[left] + nums[right];
            if (addResult === target) {
                return addResult;
            } else if (addResult > target) {
                if (addResult - target < minDiff) {
                    minDiff = addResult - target;
                    ans = addResult;
                }
                right--;
            } else {
                if (target - addResult < minDiff) {
                    minDiff = target - addResult ;
                    ans = addResult;
                }
                left++;
            }
        }
    }
    return ans;
};
// @lc code=end

