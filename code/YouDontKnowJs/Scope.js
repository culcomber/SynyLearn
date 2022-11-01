// 变量提升
// 1 函数声明提前于变量提升
// 2 函数声明提升整个函数
// 3 变量提升变量声明

foo();
function foo() {
    console.log(a); // undefined
    var a = 2;
}

// 不是函数声明，表达式，属于变量
// 即使是具名的函数表达式，名称标识符在赋值之前也无法在所在作用域中使用
foo1(); // TypeError
bar1(); // ReferenceError
var foo1 = function bar1() {
    // ……
};

// 重复的var声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的
foo(); // 3
function foo2() {
    console.log(1);
}
var foo2 = function() {
    console.log(2);
};
function foo2() {
    console.lo(3);
}