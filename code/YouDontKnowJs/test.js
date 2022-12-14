function Point(x, y) {
    this.x = x;
    this.y = y;
} // 构造函数
Point.prototype.toString1 = function () {
    return '(' + this.x + ', ' + this.y + ')';
}; // 给原型添加方法
var p = new Point(1, 2);
// 1创建空对象 2对象的原型指向函数prototype属性，prototype上有toString方法，所有实例都可以共享
// 3构造函数内部this指向空对象，执行构造函数，给空对象添加x和y属性 4返回对象

Point.prototype = {
    hell:'11'
}
var p1 = new Point(1, 2);
console.log(p.toString1) // [Function]
console.log(p.hell) // undefined
console.log(p.constructor === Point) // true

console.log(p1.toString1) // undefined
console.log(p1.hell) // 11
console.log(p1.constructor === Point) // false