// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]

const arrayList = [0,1,0,3,12];

function recordZero (nums) {
    let index = 0; // 第一遍循环记录非零元素写入位置，第二遍循环index是赋0的起始位置
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[index++] = nums[i]; // 将赋值和index加一和为一步
        }
    }
    for (let i = index; i < nums.length; i++) {
        nums[i] = 0;
    }
    console.log(nums);
}

function sordZero (nums) {
    // 参考快排，以0为基准，大于0移动到左边
    let zeroIndex = 0; // 基准
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            const item = nums[i];
            nums[i] = nums[zeroIndex];
            nums[zeroIndex++] = item;
        }
        // if (i > zeroIndex) {// #1
        //     nums[zeroIndex] = nums[i];
        //     nums[i] = 0;
        // }
        // zeroIndex++;
    }
    console.log(nums);
    return nums;
}

// recordZero(arrayList)
sordZero(arrayList)