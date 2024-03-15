// 三种写法是等价的
const promise1 = new Promise(function(resolve, reject) {
  throw new Error('test');
});
const promise2 = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
const promise3 = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});



promise1.catch(function(error) {
  console.log(error);
}); // Error: test
promise2.catch(function(error) {
  console.log(error);
}); // Error: test
promise3.catch(function(error) {
  console.log(error);
}); // Error: test
promise4.catch(function(error) {
  console.log(error);
}); // Error: test
