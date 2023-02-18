// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：5, nums = [0,1,2,3,4]
// 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。
// 不需要考虑数组中超出新长度后面的元素。
function removeDuplicates(nums) {
    // 快慢指针，快指针遍历数组，慢指针保存答案
    let result = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[result++] = nums[i];
        }
    }
    return result;
}

removeDuplicates([0,0,1,1,1,2,2,3,3,4])