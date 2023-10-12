function triplet_with_smaller_sum(arr, target) {
    arr.sort((a,b) => a -b);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        count += search_pair(arr, target - arr[i], i);
    }
    return count;
}

function search_pair(arr, target_sum, first) {
    let count = 0;
    let left = first + 1, right = arr.length - 1;
    while (left < right) {
        if(arr[left] + arr[right] < target_sum) {
            count += right - left;
            left++;
        } else {
            right--;
        }
    }
    return count;
}

console.log(triplet_with_smaller_sum([-1, 0, 2, 3], 3)); // 2
console.log(triplet_with_smaller_sum([-1, 4, 2, 1, 3], 5)); // 4