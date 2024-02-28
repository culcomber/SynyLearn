function foo() {
  console.log(a);
  var a = 1;
}

foo(); // 报错，没有用var声明a