function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.jumps = {
    jumps: true
};
let rabbit = new Rabbit("White Rabbit");
console.log(rabbit.__proto__)
console.log(Rabbit.__proto__)
console.log(Rabbit.__proto__.__proto__)
console.log(Rabbit.prototype.__proto__)
console.log('Object.prototype', Object.prototype)
console.log('Object.prototype.__proto__', Object.prototype.__proto__)