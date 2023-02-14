const arrayList = [0,1,0,3,12];
const arrayList1 = [0,1,0,3,12];

function recordZero (nums) {
    // 两遍循环，第一遍把非零移到前面，第二遍补零
    let numIndex = 0; // 积累非零数字的最新下标
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[numIndex++] = nums[i];
        }
    }
    for (let i = numIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    console.log(nums);
    return nums;
}

function sordZero (nums) {
    // 快排思想，大于零放在左边，小于放在右边
    let zeroIndex = 0; // 不是零下标往前移，如果是零下标不动
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            const item = nums[i];
            nums[i] = nums[zeroIndex];
            nums[zeroIndex++] = item;
        }
    }
    console.log(nums);
    return nums;
}

recordZero(arrayList);
sordZero(arrayList1);