function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); // 2 ————闭包的效果

////////////////////////////////
var fn;
function foo() {
    var a = 2;
    function baz() {
        console.log(a);
    }
    fn = baz; // 将baz分配给全局变量
}
function bar() {
    fn(); // 妈妈快看呀，这就是闭包！
}
foo();
bar(); // 2

// wait（..）执行1000毫秒后，它的内部作用域并不会消失，timer函数依然保有wait（..）作用域的闭包
function wait(message) {
    setTimeout( function timer() {
        console.log( message );
    }, 1000 );
}
wait( "Hello， closure！" );