// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

let height = [1,1];

// 超出时间限制
function twoLoop (height){
  let result = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let area = (j - i) * Math.min(height[i], height[j]);
      result = Math.max(result, area);
    }
  }
  console.log(result);
  return result;
}

function oneLoop (height) {
  let result = 0;
  for (let i = 0, j = height.length - 1; i < j; ) {
    let area = (j - i) * Math.min(height[i], height[j]);
    result = Math.max(result, area);
    height[i] > height[j] ? j-- : i++;
  }
  console.log(result);
  return result;
}

twoLoop(height);
oneLoop(height);