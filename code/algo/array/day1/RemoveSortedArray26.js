function removeDuplicates(nums) {
    // 设置快慢指针，快指针遍历数组，慢指针返回答案
    let slow = 1; // 下标从1开始
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[slow++] = nums[i];
        }
    }
}

nums = [0,0,1,1,1,2,2,3,3,4]

removeDuplicates(nums)