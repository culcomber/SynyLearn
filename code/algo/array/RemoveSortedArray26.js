// 输入：nums = [1,1,2]
// 输出：2, nums = [1,2,_]
// 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。
// 不需要考虑数组中超出新长度后面的元素。

function removeDuplicates(nums) {
    let slow = 1;
    let fast = 1; 
    while (fast < nums.length) {
        if (nums[fast] !== nums[fast-1]) {
            nums[slow++] = nums[fast]
        } 
        fast++;
    }
    return slow;
}

nums = [0,0,1,1,1,2,2,3,3,4]

removeDuplicates(nums)