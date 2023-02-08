let height = [1,1];

// 超出时间限制
function twoLoop (height){
  let result = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = (j - i) * Math.min(height[j], height[i]);
      result = Math.max(area, result);
    }
  }
  console.log(result);
  return result;
}

function oneLoop (height) {
  let result = 0;
  for (let i = 0, j = height.length - 1; i < j;) {
    const area = (j - i) * Math.min(height[j], height[i]);
    result = Math.max(area, result);
    height[i] > height[j] ? j-- : i++;
  }
  console.log(result);
  return result;
}

twoLoop(height);
oneLoop(height);