var a = 42;
var b = "foo";
var c = [1,2,3];

console.log(a && b || c); // foo
console.log(a || b && c); // 42