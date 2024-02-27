class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3; // 等同于对this.x赋值为3
    console.log(super.x); // undefined  读的是A.prototype.x
    console.log(this.x); // 3
    console.log(super.valueOf() instanceof B); // true
  }
}

let b = new B();