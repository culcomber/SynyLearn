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