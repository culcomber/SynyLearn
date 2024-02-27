let phrase = "Hello";

function test() {
  if (true) { // 代码块有词法环境
    let user = "John";
    function sayHi() {
      console.log(`${phrase}, ${user}`);
    }
    return sayHi
  }
}
test()(); // Hello, John