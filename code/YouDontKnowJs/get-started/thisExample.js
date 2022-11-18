var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
    },
    rotate(angleRadians) {
        var rotatedX = this.x * Math.cos(angleRadians) -
            this.y * Math.sin(angleRadians);
        var rotatedY = this.x * Math.sin(angleRadians) +
            this.y * Math.cos(angleRadians);
        this.x = rotatedX;
        this.y = rotatedY;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

// Implicit Context Invocation
point.init(3,4); // this is point

// Default Context Invocation
const init = point.init;
init(3,4); // this is globe

// Explicit Context Invocation
init.call( point, 3, 4 ); // this is point
// or: init.apply( point, [ 3, 4 ] )
var anotherPoint = {
    init: point.init,
    rotate: point.rotate,
    toString: point.toString,
};
anotherPoint.init(5,6);
anotherPoint.x;         // 5
anotherPoint.y;         // 6

// New Context Invocation
/*
var newPoint = new point.init(3,4);
newPoint.x;     // 3
newPoint.y;     // 4
*/

// 箭头函数
function outer() {
    console.log(this.value);
    // define a return an "inner" function
    var inner = () => {
        console.log(this.value);
    };
    return inner;
}

var one = {
    value: 42,
};
var two = {
    value: "sad face",
};

var innerFn = outer.call(one);
// 42
console.log(innerFn)
innerFn.call(two);
// 42   <-- not "sad face"
console.log(innerFn)