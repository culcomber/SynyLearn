let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

let { o4 } = {o2};
o4 // { b: 2 }
o4.a // undefined