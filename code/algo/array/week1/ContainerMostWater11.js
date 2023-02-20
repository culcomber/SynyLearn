let height = [1,1];

// 超出时间限制
function twoLoop (height){
  let result = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = (j - i) * Math.min(height[j], height[i]);
      result = Math.max(result, area);
    }
  }
  console.log(result);
  return result;
}

function oneLoop (height) {
  let result = 0;
  let i = 0, j = height.length - 1;
  while (i < j) {
    const area = (j - i) * Math.min(height[j], height[i]);
    result = Math.max(result, area);
    height[j] > height[i] ? i++ : j--;
  }
  return result;
}

twoLoop(height);
oneLoop(height);