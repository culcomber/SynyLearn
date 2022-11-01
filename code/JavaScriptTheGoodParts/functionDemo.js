// 方法调用
// 创建 myObject 对象。它有一个 value 属性和一个 increment 方法。
// increment 方法接受一个可选的参数。如果参数不是数字，那么默认使用数字1。
const myObject = {
    value: 0,
    increment: function (inc) {
        // this就是myObject
        // 通过this可取得它们所属对象的上下文的方法称为公共方法（public method）
        this.value += typeof inc === 'number' ? inc : 1;
    }
};
myObject.increment(); // console.log(myObject.value) // 1
myObject.increment(2); // console.log(myObject.value) // 3

// 函数调用
const value = 20;
const add = function (a, b) {
    return a + b;
};
const sum = add(3, 4);     // sum 的值为7。

// 方法内部调用函数，helper函数内this是全局对象
// 全局对象，在浏览器环境下global是window对象（var声明变量会存储到window）
myObject.double = function () {
    const that = this;   // this是object
    const helper = function () {
        that.value = add(that.value, that.value);
    }; // myObject.value--6 value--20
    /*const helper = function () {
        console.log(this)  // this是全局对象，和add函数相同
        console.log(value) // 20
        // this.value = add(this.value, this.value);
    };*/ // 浏览器且value使用var声明，myObject.value--3 value--40；
    // 编译器 or let/const声明变量：myObject.value--3 value--20
    helper(); //以函数的形式调用 helper。
};
myObject.double();

// 构造器调用
// 如果在一个函数前面带上new来调用，将会创建一个新对象，新对象prototype连接到该函数，this会被绑定到新对象上
const Quo = function (string) { // 创建一个名为 Quo 的构造器函数。它构造一个带有 status 属性的对象。
    this.status = string;
};
Quo.prototype.get_status = function () { // 给 Quo 的所有实例提供一个名为 get_status 的公共方法。
    return this.status;
};
const myQuo = new Quo("confused"); // 构造一个 Quo 实例。
console.log(myQuo.get_status()); // 打印显示“confused”。

// apply调用，apply方法接收两个参数，第1个是要绑定给this的值，第2个就是一个参数数组。
const statusObject = {
    status: 'A-OK'
}; // 构造一个包含 status 成员的对象。
// statusObject 并没有继承自 Quo.prototype，但我们可以在 statusObject 上调
// 用get_status 方法，尽管 statusObject 并没有一个名为 get_status 的方法。
const status = Quo.prototype.get_status.apply(statusObject); // console.log(status); // 'A-OK'

// Arguments访问所有它被调用时传递给它的参数列表，类数组结构，没有array方法
// 构造一个将大量的值相加的函数。注意该函数内部定义的变量 sum2 不会与函数外部定义的 sum2 产生冲突。
const sum2 = function ( ) {
    let i, sum2 = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum2 += arguments[i];
    }
    return sum2;
};
console.log(sum2(4, 8, 15, 16, 23, 42)); // 108

// 扩展函数功能
// 通过给Function.prototype增加一个method方法，下次给对象增加方法的时候就不必键入prototype这几个字符，
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) { // 保证没有重名，然后覆盖原来方法
        this.prototype[name] = func;
    }
    return this;
};
// 给Number.prototype增加一个integer方法来改善js原本取整函数。根据数字的正负来判断是使用Math.ceiling还是Math.floor。
Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
console.log((-10 / 3).integer( )); // -3
// JavaScript缺少一个移除字符串首尾空白的方法。这个小疏忽很容易弥补：
String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});
console.log('"' + " neat ".trim( ) + '"'); // "neat"

// 闭包，函数a内部有个函数b，函数b可以访问a里面声明的变量，调用a返回b，函数a被销毁，函数b没有被销毁
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        };
    }
};
var add_the_handlers1 = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i);
        };
    };
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i);
    }
};

String.method('deentityify', function ( ) {
    // 字符实体表。它映射字符实体的名字到对应的字符。
    // 把它定义在函数内部，会带来运行时的损耗，因为每次执行该函数的时候该字面量都会被求值一次。理想的方式是把它放入一个闭包
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    return function () {  // 返回deentityify 方法。
        // 查找‘&’开头和‘;’结束的子字符串。如果这些字符可以在字符实体表中找到，那么就将该字符实体替换为映射表中的值。
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}()); // 立即执行
console.log('&lt;&quot;&gt;'.deentityify()); // <">

var serial_maker = function ( ) {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function ( ) {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};
var seqer = serial_maker( );
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym( ); // unique 是"Q1000"