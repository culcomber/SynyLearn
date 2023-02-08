// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶

function threeSum (n) {
  let result = 0;
  let one = 1;
  let two = 2;
  if (n <= 2) {
    return n;
  } else {
    for (let i = 3; i <= n; i++) {
      result = one + two;
      one = two;
      two = result;
    }
  }
  return result;

  // let p = 0, q = 0, r = 1;
  //   for (let i = 1; i <= n; ++i) {
  //       p = q;
  //       q = r;
  //       r = p + q;
  //   }
  //   return r;
};

console.log(threeSum(4));