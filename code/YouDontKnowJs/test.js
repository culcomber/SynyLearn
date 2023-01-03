function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        console.log(arguments)
        if (!active) {
            active = true;
            console.log(active)
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            console.log(active)
            return value; // return sum(x + 1, y - 1) --> accumulator(x + 1, y - 1)
        }
    };
}

var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});

const hello = sum(1, 3) // 100001
console.log(hello)