/*function foo1(x1, y1) {
  console.log('x1', x1)
}
foo1()


function foo2(x2, y2) {
  var x2 = 3
  let hello = 'hello'
  console.log('x2', x2)
}
foo2()


function foo3(x3 = 1, y3 = 2) {
  console.log('x3', x3)
}
foo3()


function foo4(x4 = 1, y4 = 2) {
  var x4 = 3
  let hello = 'hello'
  console.log('x4', x4)
}
foo4()

function foo5(x5 = 1, y5) {
  var x5 = 3
  let hello = 'hello'
  console.log('x5', x5)
}
foo5()*/

/** 形参有默认值 */
/**
 * Block x=(undefined --> 3)
 * Local x=(undefined --> 2) y=fn
 *
 * x有默认值
 * Block x=(4 --> 3)
 * Local x=(4 --> 2) y=fn
 *
 * 调用函数时传递x
 * Block x=3
 * Local x=4 y=fn
 */
/*var x1 = 1
function foo1(x1, y1 = function () { x1 = 2 }) {
  var x1 = 3
  y1()
  console.log('x1', x1) // 3
}
foo1(4)
console.log('x1', x1) // 1*/


/** 传递值 */
/**
 * Local x=(undefined --> 3) y=fn(执行函数改变全局的x2)
 *
 * x有默认值
 * Block x=(4 --> 3)
 * Local x=4 y=fn(执行函数改变全局的x2)
 *
 * 调用函数时传递x
 * Local x=(undefined --> 3) y=fn(执行函数改变全局的x2)
 */
/*var x2 = 1
function foo2(x2, y2) {
  var x2 = 3
  y2()
  console.log('x2', x2) // 3
}
foo2(4, function () { x2 = 2 })
console.log('x2', x2) // 2*/

/** 形参没有默认值，也没有传递值 */
/**
 * Local x=3 y=undefined
 *
 * x有默认值
 * Block x=3
 * Local x=4 y=undefined
 *
 * 调用函数时传递x
 * Local x=3 y=undefined
 */
/*var x3 = 1
function foo3(x3, y3) {
  var x3 = 3
  y3 && y3()
  console.log('x3', x3) // 3
}
foo3(2)
console.log('x3', x3) // 1*/
/*let x = 1;
function fun(x, y = x) {
  console.log(y);
}
fun(2);*/





