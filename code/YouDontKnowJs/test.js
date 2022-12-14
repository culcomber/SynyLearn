function F () {
    this.he = '11'
}
var f = new F();

console.log(f[[Prototype]])
console.log(F.__proto__)

console.log(Object.getPrototypeOf(f) === F.prototype)
console.log(Object.getPrototypeOf(F.prototype) === Object.prototype) // true

console.log(Object.getPrototypeOf(F) === Function.prototype) // true
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype) // true