// 直接在原型对象上添加方法，即使已经创建的对象也可以获取到
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}
const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
Dog.prototype.play = () => console.log("Playing now!");
dog1.play();
dog2.bark();


// SuperDog继承Dog，实例superDog1在原型链上可以访问Dog.prototype
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`Flying!`);
  }
}
const superDog1 = new SuperDog("Super Daisy");
superDog1.bark();
superDog1.fly();


// 使用Object.create创建原型对象
const dog = {
  bark() {
    console.log(`Woof!`);
  }
};
const pet1 = Object.create(dog);
pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));
console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));
