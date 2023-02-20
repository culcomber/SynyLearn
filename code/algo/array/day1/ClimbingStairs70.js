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
  };
  
  console.log(threeSum(5));