// 继承自Object.prototype，所以numbers继承了大量有用的方法。同时，numbers也有一个诡异的length属性
var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
];

// length
numbers.length = 3; // numbers 是 ['zero', 'one', 'two']
numbers[numbers.length] = 'shi';// numbers 是 ['zero', 'one', 'two', 'shi']

// 删除
delete numbers[2]; // numbers 是 ['zero', 'one', undefined, 'shi', 'go']
numbers.splice(2, 1); // numbers 是 ['zero', 'one', 'shi', 'go']

// 判断数组
var is_array = function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};

// concat
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true); // c 变成 ['a', 'b', 'c', 'x', 'y', 'z', true]

// join
a = ['a', 'b', 'c'];
a.push('d');
c = a.join(''); // c 是 'abcd';

// pop
a = ['a', 'b', 'c'];
c = a.pop( ); // a 是 ['a', 'b'] & c 是 'c'
Array.method('pop', function ( ) {
    return this.splice(this.length - 1, 1)[0];
});

// push
a = ['a', 'b', 'c'];
b = ['x', 'y', 'z'];
c = a.push(b, true); // a 是 ['a', 'b', 'c', ['x', 'y', 'z'], true] c 是 5
Array.method('push', function ( ) {
    this.splice.apply(
        this,
        [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
})

// reverse
a = ['a', 'b', 'c'];
b = a.reverse(); // a 和 b 都是 ['c', 'b', 'a']

// shift
a = ['a', 'b', 'c'];
c = a.shift( ); // a 是 ['b', 'c'] & c 是 'a'
Array.method('shift', function ( ) {
    return this.splice(0, 1)[0];
});

// unshift
var a = ['a', 'b', 'c'];
var r = a.unshift('?', '@');
// a 是 ['?', '@', 'a', 'b', 'c']
// r 是 5
Array.method('unshift', function ( ) {
    this.splice.apply(this,
        [0, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});

// slice
a = ['a', 'b', 'c'];
b = a.slice(0, 1); // b 是 ['a']
c = a.slice(1); // c 是 ['b', 'c']
d = a.slice(1, 2); // d 是 ['b']

// sort 默认比较函数把要被排序的元素都视为字符串
var n = [4, 8, 15, 16, 23, 42];
n.sort( ); // n 是 [15, 16, 23, 4, 42, 8]
n.sort(function (a, b) {
    return a - b;
}); // n 是 [4, 8, 15, 16, 23, 42];

// splice
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 'bug');
// a 是['a', 'ache', 'bug', 'c']
// r 是['b']
Array.method('splice', function (start, deleteCount) {
    var max = Math.max,
        min = Math.min,
        delta,
        element,
        insertCount = max(arguments.length - 2, 0),
        k = 0,
        len = this.length,
        new_len,
        result = [ ],
        shift_count;

    start = start || 0;
    if (start < 0) {
        start += len;
    }
    start = max(min(start, len), 0);
    deleteCount = max(min(typeof deleteCount === 'number' ?
        deleteCount : len, len - start), 0);
    delta = insertCount - deleteCount;
    new_len = len + delta;
    while (k < deleteCount) {
        element = this[start + k];
        if (element !== undefined) {
            result[k] = element;
        }
        k += 1;
    }
    shift_count = len - start - deleteCount;
    if (delta < 0) {
        k = start + insertCount;
        while (shift_count) {
            this[k] = this[k - delta];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    } else if (delta > 0) {
        k = 1;
        while (shift_count) {
            this[new_len - k] = this[len - k];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    }
    for (k = 0; k < insertCount; k += 1) {
        this[start + k] = arguments[k + 2];
    }
    return result;
});