const arrayList = [0,1,0,3,12];

function recordZero (nums) {
    // 边界处理
    
    // 第一遍遍历，非零元素移到前面，记录非零的个数
    let zeroIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            // zeroIndex遇到非零才会移动，保证遍历完数组后非零元素都排在前面
            nums[zeroIndex++] = nums[i]; 
        }
    }

    // 第二遍遍历，数组后面补零
    for (let i = zeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    console.log(nums);
}

function sordZero (nums) {
    // 快排
    let zeroIndex = 0; // 基准0所在位置
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            let item = nums[i];
            nums[i] = nums[zeroIndex];
            nums[zeroIndex++] = item;
        }
    }
    console.log(nums);
}


// recordZero(arrayList)
sordZero(arrayList)