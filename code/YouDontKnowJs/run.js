var x = 1;
var obj = {
    x: 2,
    y: function () {
        console.log(this.x);
    }
};
obj.y() // 2
setTimeout(obj.y, 1000) // 1