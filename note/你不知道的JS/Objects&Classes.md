## Chapter 1: Object Foundations

the pairing of a property name and a value often called a "property"

### 1.1 Defining Properties

**与`JSON`区别**

- `JSON`属性名必须用双引号包裹，对象

- `JSON`属性值必须是基本类型（literals），而不是表达式
- `JSON`不允许注释

`JSON` 的确是 JavaScript 语法的一个子集，但是 `JSON` 本身并不是合法的 JavaScript 语法

```js
 {"a"：42} 
```

**property name**

属性名会被转成string，所以不要使用对象作为属性名

```js
anotherObj = {
    [myObj]:  "<-- ...and so will this one", // [myObj]最终会保存为"[object Object]"
    ["x" + (21 * 2)]: true // 属性名可以是表达式，"x42": true,
    42:"integer11",
    ‘42’:"integer", // 与42:"integer11",是相同声明integer覆盖integer11
};
console.log(anotherObj['42']) // integer
console.log(anotherObj[42]) // integer

// 但是map可以使用对象作为key
const map1 = new Map();
const b = {hello: 'world'};
map1.set('a', 1);
map1.set(b, 2);
console.log(map1.get('a'));// expected output: 1
console.log(map1.get(b));// expected output: 2

// 属性名可以是Symbol，Symbol接受一个字符串（可选）来创建唯一值
myPropSymbol = Symbol("optional, developer-friendly description");
anotherObj = {
    [myPropSymbol]: "Hello, symbol!"
};
console.log(anotherObj.myPropSymbol); // undefind，相当于anotherObj["myPropSymbol"]
console.log(anotherObj[myPropSymbol]); // Hello, symbol!

// 属性名和属性值相同时，可以采用简洁写法
coolFact = "the first person convicted of speeding was going 8 mph";
anotherObj = {
    coolFact: coolFact
};
// 等同于
anotherObj = {
    coolFact   // <-- concise property short-hand
};
// 方法也有简洁写法，Concise Methods
anotherObj = {
    greet: function() { console.log("Hello!"); }, // standard function property
    greet2() { console.log("Hello, friend!"); }, // concise function/method property
    "greet-4"() { console.log("Hello, audience!"); },
    [ "gr" + "eet 5" ]() { console.log("Hello, audience!"); }, // concise computed name
    *[ "greet 6".toUpperCase() ]() { yield "Hello, audience!"; } // concise computed generator name
};
```

**Object Spread**

当在一个对象字面量前使用`...`时，将把属性（键/值对）"扩散 "到正在定义的对象中。只能**在`{ .. }`对象字面量内使用**，使用后就会创建新的对象属性。the `...` object spread syntax can only appear inside the `{ .. }` object literal, which is creating a new object value.

**浅拷贝**，可以想象成一个for循环，只复制了可以枚举的顶层属性，如果有属性值是对象，只是复制对象所在地址

```js
const myObj = {
    favoriteNumber: 'function',
    hello: 'function'
}
const anotherObj = {
    favoriteNumber: 12,
    ...myObj,   // 属性定义操作是 "按顺序 "发生的，会覆盖favoriteNumber: 12
    hello: 'world' // 会覆盖从myObj复制的hello: 'function'
}
console.log(anotherObj); // { favoriteNumber: 'function', hello: 'world' }
```

**Deep Object Copy**

1. Use a **library utility** that declares a specific opinion on how the duplication behaviors/nuances should be handled.
2. Use the `JSON.parse(JSON.stringify(..))` round-trip trick -- this only "works" correctly if there are no circular references, and if there are no values in the object that cannot be properly serialized with JSON (such as functions).
3. This is not a JS feature, but rather a companion API provided to JS by environments like the web platform. Objects can be deep copied now using `structuredClone(..)`[^stucturedClone].

```js
// no support for cloning functions or DOM elements.
myObjCopy = structuredClone(myObj);
```

### 1.2 Accessing Properties

**遍历**

`Object.entries(..)` 遍历属性

`Object.keys(..)` 遍历key；`Object.getOwnPropertyNames(..)`可以返回**non-enumerable**属性名，但是不会返回Symbol；`Object.getOwnPropertySymbols(..)`只返回Symbol属性名

`Object.values(..)`遍历value

for...in 以任意顺序迭代一个对象的除[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)以外的[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)属性，包括**继承**的可枚举属性。

```js
myObj = {
    favoriteNumber: 42,
    isDeveloper: true,
};
console.log(Object.entries(myObj)); // [ ["favoriteNumber",42], ["isDeveloper",true]]
console.log(Object.keys(myObj)); // [ 'favoriteNumber', 'isDeveloper' ]
console.log(Object.values(myObj)); // [ 42, true ]
console.log(Object.getOwnPropertyNames(myObj)); // [ 42, true ]
console.log(Object.getOwnPropertySymbols(myObj)); // [ Symbol(test) ]

// Object.fromEntries(iterable) iterable类似 `Array`、 `Map` 或者其它实现了可迭代协议的可迭代对象
myObjShallowCopy = Object.fromEntries( Object.entries(myObj) ); // 等同于myObjShallowCopy = { ...myObj };
```

**`Destructuring`**

解构赋值 `{...}`出现在左边

```js
myObj = {favoriteNumber: 42,isDeveloper: true,firstName: "Kyle"};

const favoriteNumber = (myObj.favoriteNumber !== undefined ? myObj.favoriteNumber : 42);
const isDev = myObj.isDeveloper;
const firstName = myObj.firstName;
const lname = (myObj.lastName !== undefined ? myObj.lastName : "--missing--");

// 等同于
const { favoriteNumber = 12 } = myObj; // 当favoriteNumber未定义给与默认值
const {
    isDeveloper: isDev, // 将myObj的isDeveloper赋值给变量isDev
    firstName, // 等价于firstName:firstName，这样写更简洁
    lastName: lname = "--missing--"
} = myObj;

// Destructuring is about access and assignment (source to target) 不限于创建变量
let fave;
// surrounding ( ) are required syntax here, when a declarator is not used
({ favoriteNumber: fave } = myObj);
fave;  // 42

```

object is sometimes just a **temporary transport container** rather than a meaningful value in and of itself

```js
function formatValues({ one, two, three }) { // 传入对象解构成三个值
    one = one.toUpperCase();
    two = `--${two}--`;
    three = three.substring(0,5);

    return { one, two, three };
}

// 返回对象被解构出三个变量
const { one, two, three } = formatValues({one: "Kyle",two: "Simpson"three: "getify"});

one;     // "KYLE"
two;     // "--Simpson--"
three;   // "getif"
```

**Conditional Property Access**

`A?.B`，检查**A**是否为(`null` or `undefined`)，如果是表达式剩下部分会被跳过并返回 `undefined` ，如果不是`?.`将像普通的`.`操作符那样访问属性

不应该普遍使用`?.`来代替每个`.`运算符。在可能的情况下，应该在进行访问之前努力了解`.`属性的访问是否会成功。只有当被访问的值的性质受制于无法预测/控制的条件时，才使用`?.`

```js
myObj?.address?.city
// 等同于
(myObj != null && myObj.address != null) ? myObj.address.city : undefined

// 更优使用
myObj.address?.city
myObj["2 nicknames"]?.[0];   // "getify"
```

### 1.3 Assembling Properties

**assign一次分配多个属性**

```js
// shallow copy all (owned and enumerable) properties from `myObj` into `anotherObj`
const anotherObj = {} // 可以有属性，与source同名属性会被覆盖
Object.assign(
    /*target=*/anotherObj,
    /*source1=*/{
        someProp: "some value",
        anotherProp: 1001,
    },
    /*source2=*/{
        yetAnotherProp: false,
        anotherProp: '100',
    }
); // { someProp: 'some value', anotherProp: '100', yetAnotherProp: false }
```

### 1.4 Deleting Properties

only way to remove property is with the `delete` operator，distinct from assigning it a value like `undefined` or `null`

```js
anotherObj = {counter: 123};
anotherObj.counter;   // 123
delete anotherObj.counter;
anotherObj.counter;   // undefined
```

### 1.5 Determining Container Contents

```js
myObj = {favoriteNumber: 42};
console.log("favoriteNumber" in myObj);                  // true in操作符会查找原型链
console.log(myObj.hasOwnProperty("favoriteNumber"));     // true

myObj.favoriteNumber = undefined;
console.log("favoriteNumber" in myObj);                  // true
console.log(myObj.hasOwnProperty("favoriteNumber"));     // true

delete myObj.favoriteNumber;
console.log("favoriteNumber" in myObj);                  // false
console.log(myObj.hasOwnProperty("favoriteNumber"));     // false

// hasOwnProperty这么重要的属性作为一个实例方法，而不是被定义为一个静态工具是不好的
// It's always been considered somewhat unfortunate (semantic organization, naming conflicts, etc) that such an important utility as hasOwnProperty(..) was included on the Object [[Prototype]] chain as an instance method, instead of being defined as a static utility.
// ES2022 不是通过object's[[Prototype]]，更安全
const object1 = {prop: 'exists'};
console.log(Object.hasOwn(object1, 'prop')); // expected output: true
console.log(Object.hasOwn(object1, 'toString'));// expected output: false
// simple polyfill sketch for `Object.hasOwn(..)`
if (!Object.hasOwn) {
    Object.hasOwn = function hasOwn(obj,propName) {
        return Object.prototype.hasOwnProperty.call(obj,propName);
    };
}
```

## Chapter 2: How Objects Work

### 2.1 Property Descriptors

描述属性的对象，`Object.getOwnPropertyDescriptor(..)`获取

`accessor property`：getter/setter

```js
myObj = {favoriteNumber: 42,};
Object.getOwnPropertyDescriptor(myObj,"favoriteNumber");
// {
//     value: 42,
//     enumerable: true,
//     writable: true,
//     configurable: true
// }

Object.defineProperty(myObj,"fave",{
    // 数据描述符和存取描述符不能混合使用
    //value: 50,
    enumerable: true,     // default if omitted
    //writable: true,       // default if omitted
    configurable: true,    // default if omitted
    get() { console.log("Getting 'fave' value!"); return 123; },
    set(v) { console.log(`Ignoring ${v} assignment.`) }
}, "superFave": {// another property descriptor
});
anotherObj.fave; // Getting 'fave' value! 得到123
anotherObj.fave = 42;// Ignoring 42 assignment.
anotherObj.fave; // Getting 'fave' value! 得到123
```

`writeable: false`以通过设置`Object.defineProperty(..)`来改变`writeable`

`configurable: false`调用`Object.defineProperty(..)`都会失败，此时 `writable: true` 的话还是可以改变属性的值

### 2.2 Object Sub-Types

继承了父类型的行为，但又扩展了行为。换句话说，values of these sub-types are fully objects, but are also *more than just* objects.

**Arrays**

使用**数字**作为索引的对象

```JS
myList = [ 23, 42, 109 ];
myList.hello = 'hello';
myList['1'] = 'actor';
console.log(myList); // [ 23, 'actor', 109, hello: 'hello' ]
console.log(myList[1]); // actor
console.log(myList['1']); // actor

// Empty Slots  
myList = [ 23, 42, 109 ];
myList[14] = "Hello";
myList.length; // 15
myList; // [ 23, 42, 109, empty x 11, "Hello" ]

// looks like a real slot with a real `undefined` value in it, but beware, it's a trick!
myList[9]; // undefined 其实是empty，数组方法 map(..)会跳过empty
```

**Functions**

```js
function help(opt1,opt2,param = 42,...remainingOpts) {
    // ..
}

// pre-defined properties 
console.log(help.name);          // "help"
console.log(help.length);        // 2 函数的长度是其明确定义的参数的数量，不包括定义了默认值的参数（例如，param = 42）或 "其余参数"（例如，...restainingOpts）。

help.hello = 'function';
console.log(help.hello); // "function"
// 函数不要添加属性，如真需要可以使用map
extraInfo = new Map();
extraInfo.set(help,"this is some important information");
extraInfo.get(help);   // "this is some important information"
```

### 2.3 Object Characteristics

- extensible：**`Object.preventExtensions()`**方法让一个对象变的不可扩展，也就是永远不能再**添加新属性**。
- sealed：**`Object.seal()`**方法封闭一个对象，extensible基础上，将所有**现有属性标记为不可配置**。当前属性的值只要原来是可写的就可以改变。
- frozen：**`Object.freeze()`** 方法可以**冻结**一个对象。sealed基础上，不可以写、删除属性，自身的所有属性都不可能以任何方式被修改，访问器属性（有 getter 和 setter）也同样。如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。

### 2.4 [[Prototype]] Chain

[[Prototype]]是一个对象在创建时默认得到的内部链接，指向另一个对象。

The `[[Prototype]]` is an internal linkage that an object gets by default when its created, pointing to another object. 

所有对象的`[[Prototype]]`链接到名为`Object.prototype`的内置对象。

All objects are `[[Prototype]]`-linked to the built-in object named `Object.prototype`.

`prototypal inheritance/delegation`：原型继承/委托，`Object.prototype`的内置的属性和方法，通过 `[[Prototype]]`被继承

- `constructor`
- `__proto__`
- `toString()`
- `valueOf()`
- `hasOwnProperty(..)`
- `isPrototypeOf(..)`

**Creating An Object With A Different [[Prototype]]**

```js
// Object.create(proto, propertiesObject) 第二个参数可选和Object.defineProperties() 的第二个参数一样，属性描述符的对象
myObj = Object.create(differentObj);

// 等价于
myObj = {
    __proto__: differentObj, // .. the rest of the object definition
};
```

**Empty `[[Prototype]]` Linkage**——dictionary objects

`differentObj`的`[[Prototype]]`还是`Object.prototype`

原型链有尽头，`Object.prototype`的`[[Prototype]]`是`null`

创建一个没有原型对象，需要`null`

```js
emptyObj = Object.create(null); // or: emptyObj = { __proto__: null }
emptyObj.toString;   // undefine
```

**[[Prototype]] vs prototype**

所有函数都有prototype属性（该属性值是一个对象），`Object`其实是 `Object(..)` ，所以就有`Object.prototype`

`Object` is the `Object(..)` function; by default, all functions (which are themselves objects!) have such a `prototype` property on them, pointing at an object.

In other words, you can think of functions themselves as having been "created" by a `new Function(..)` call, and then `[[Prototype]]`-linked to the `Function.prototype` object. This object contains properties/methods all functions "inherit" by default, such as `toString()` (to string serialize the source code of a function) and `call(..)` / `apply(..)` / `bind(..)` 

由于{ .}对象字面语法与new Object()调用基本相同，被命名/定位在Object.prototype的内置对象被用作我们创建并命名为myObj的新对象的内部[[Prototype]] 值。

## Chapter 3: Classy Objects

I've suggested strongly that you should only use `class` if you're going to really take advantage of most or all of what class-orientation gives you. Otherwise, you'd be better suited using other core pillar features of JS for organizing code, such as with the closure pattern.

class更像是原型的语法糖

`class` is not its own separate pillar of the language (as `[[Prototype]]` is), but more like the fancy, decorative *Capital* that tops the pillar/column.

### 3.1 Keep It classy

```js
class Point2d { // 内部使用严格模式
    setX(x) { // 创建的实例通过[[Prototype]]继承该方法
        // ..
    } // 不需要 ; or ,
    setY(y) {
        // ..
    }
}

// named class expression
const pointClass = class Point2d {
    // ..
};

// anonymous class expression
const anotherClass = class {
    // ..
};

typeof Point2d; // "function"
Point2d.toString();
// class Point2d {
//   ..
// }
Point2d(); // TypeError: Class constructor Point2d cannot be invoked without 'new'
Point2d.call({});// TypeError: Class constructor Point2d cannot be invoked without 'new'
```

**The Constructor**

每次创建类的新实例时都会调用构造函数

```js
class Point2d {
    constructor() {
        console.log("Here's your new instance!");
    }
}

// Point2d的实例point one都有 [[Prototype]] linkage to the Point2d.prototype object
var point = new Point2d(); // Here's your new instance!
var one = new Point2d();
// 每个实例是独立的
one.value = 42;
two.point;      // undefined
```

**Class Instance `this`**

```js
class Point2d {
    constructor(x,y) {
        // this指向实例
        this.getDoubleX = () => this.x * 2;
        this.x = x;
        this.y = y;
    }
    // 箭头函数this指向外部，这里向实例
    getDoubleY = () => this.y * 2
}

var point = new Point2d(3,4);
point.getDoubleX();    // 6
```

### 3.2 Class Extension

```js
class Point2d {
    x = 3;y = 4;
    getX() {return this.x;}
}

class Point3d extends Point2d {
    x = 21;y = 10;z = 5;
    getX() {return this.x * 2;} // 多态polymorphism重写继承Point2d的方法
    printX() {console.log(`x: ${super.getX()}`);} // super访问Point2d
    printDoubleX() {console.log(`double x: ${this.getX() * 2}`);}
}

var point = new Point2d();
point.getX(); // 3

var anotherPoint = new Point3d();
anotherPoint.getX();  // 21
anotherPoint.printX();       // x: 21
anotherPoint.printDoubleX();    // double x: 42
```

**That's Super!**

```js
class Point2d {
    x;y;
    constructor(x,y) {
        console.log("Running Point2d(..) constructor"); 
        this.x = x;
        this.y = y;
    }
}

class Point3d extends Point2d {
    z = console.log("Initializing field 'z'"); // 3
    constructor(x,y,z) {
        console.log("Running Point3d(..) constructor"); // 1
        super(x,y); // 2
        console.log(`Setting instance property 'z' to ${z}`); // 4
        this.z = z;
    }
    toString() {
		console.log(`(${this.x},${this.y},${this.z})`);
    }
}

var point = new Point3d(3,4,5);
// Running Point3d(..) constructor
// Running Point2d(..) constructor
// Initializing field 'z'
// Setting instance property 'z' to 5

// "Inheritance" Is Sharing, Not Copying
Object.hasOwn(point,"x"); // true
Object.hasOwn(point,"y"); // true
Object.hasOwn(point,"z"); // true
Object.hasOwn(point,"toString"); // false
Object.hasOwn(Point3d.prototype,"toString"); // true
```

**`new.target`**

返回一个指向构造方法或函数的引用

在普通的函数调用中，`new.target`的值是`undefined`

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A { constructor() { super(); } }
var a = new A(); // logs "A"
var b = new B(); // logs "B"

class C { constructor() { console.log(new.target); } }
class D extends C { constructor() { super(); } }
var c = new C(); // logs class C{constructor(){console.log(new.target);}}
var d = new D(); // logs class D extends C{constructor(){super();}}
```

**Kind Of Instance**

```js
class Point2d { /* .. */ }
class Point3d extends Point2d { /* .. */ }

var point = new Point2d(3,4);
point instanceof Point2d;           // true
point instanceof Point3d;           // false
var anotherPoint = new Point3d(3,4,5);
anotherPoint instanceof Point2d;    // true
anotherPoint instanceof Point3d;    // true

Point2d.prototype.isPrototypeOf(point); // true
Point3d.prototype.isPrototypeOf(point); // false
Point2d.prototype.isPrototypeOf(anotherPoint); // true
Point3d.prototype.isPrototypeOf(anotherPoint); // true

// 不检查原型链
// constructor其实不存在于point。在point通过[[Prototype]]连接的prototype object上 Point2d.prototype.constructor
// It's on each object's [[Prototype]] linked prototype object
point.constructor === Point2d;          // true
point.constructor === Point3d;          // false
anotherPoint.constructor === Point2d;   // false
anotherPoint.constructor === Point3d;   // true
```

### 3.3 Static/Private Class Behavior

**static通过类名访问，private Class定义时访问，constructor this绑定实例**

类（class）通过 **static** 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能，Class定义时就会定义static。

unlike public field initializations, which only happen once an instantiation (with `new`) occurs, **class static initializations always run *immediately* after the `class` has been defined.** 

```js
class Point2d {
    // class statics
    static origin = new Point2d(0,0)
    static distance(point1,point2) {
        return Math.sqrt(
            ((point2.x - point1.x) ** 2) +
            ((point2.y - point1.y) ** 2)
        );
    }

    // static initialization block (as of ES2022)
    static {
        let outerPoint = new Point2d(6,8);
        this.maxDistance = this.distance(
            this.origin,
            outerPoint
        );
    }
}

class Point3d extends Point2d {
    // class statics
    static origin = new Point3d(
        super.origin.x, super.origin.y, 0
    )
    static distance(point1,point2) {
        // here, super.distance(..) is Point2d.distance(..),if we needed to invoke it
        return Math.sqrt(
            ((point2.x - point1.x) ** 2) +
            ((point2.y - point1.y) ** 2) +
            ((point2.z - point1.z) ** 2)
        );
    }

    // instance members/methods
    z
    constructor(x,y,z) {
        super(x,y);     // <-- don't forget this line!
        this.z = z;
    }
    toString() {
        return `(${this.x},${this.y},${this.z})`;
    }
}

Point2d.maxDistance;        // 10
Point3d.maxDistance;        // 10
```

**Private Class Behavior**

私有字段在类声明的构造方法中就可被访问，从作用域之外引用 `#` 名称、内部在未声明的情况下引用私有字段、或尝试使用 `delete` 移除声明的字段都会抛出语法错误。

```js
class ClassWithPrivateField {
  #privateField;
  static #PRIVATE_STATIC_FIELD;
    
  #privateMethod() {
    return 'hello world';
  }
  static #privateStaticMethod() {
    return 'hello world';
  }
    
  delete this.#privateField;   // 语法错误
  this.#undeclaredField = 444; // 语法错误
}

class SubClass extends ClassWithPrivateField {
  #subPrivateField;
  constructor() {
    super(); // 
    this.#subPrivateField = 23;
  }
}

const instance = new ClassWithPrivateField()
instance.#privateField === 42;   // 语法错误
```

cannot add a private member to a class declaration dynamically while in the constructor method

though private fields can be re-assigned, they cannot be `delete`d from an instance, the way a public field/class member can

private statics are similarly not-inherited by subclasses just as private members/methods are not.

```js
class Point2d {
    // statics
    static samePoint(point1,point2) {
        return point1.#ID === point2.#ID;
    }

    // privates
    #ID = null
    #assignID() {
        this.#ID = Math.round(Math.random() * 1e9);
    }

    // publics
    x;y;
    constructor(x,y) {
        this.#assignID(); // 必须在主体class内声明
        this.x = x;
        this.y = y;
    }
}

var one = new Point2d(3,4);
var two = new Point2d(3,4);
Point2d.samePoint(one,two);         // false
Point2d.samePoint(one,one);         // true
```

## Chapter 4: This Works

谨慎使用，决定this指向——函数是怎么被调用的

JS scope is always and only **lexical and *static*** (if we ignore non-strict mode cheats like `eval(..)` and `with`). However, one of the truly powerful things about JS is that it offers another mechanism with similar flexibility and capabilities to ***dynamic* scope**.

The `this` mechanism is, effectively, *dynamic* context (not scope); it's how a `this`-aware function can be dynamically invoked against different contexts -- something that's impossible with closure and lexical scope identifiers!

*how* the functions are called; that's the only factor that matters.

**new**

Here are the 4 special steps that JS performs when a function is invoked with `new`:

1. create a brand new empty object, out of thin air.
2. link the `[[Prototype]]` of that new empty object to the function's `.prototype` object (see Chapter 2).
3. invoke the function with the `this` context set to that new empty object.
4. if the function doesn't return its own object value explicitly (with a `return ..` statement), assume the function call should instead return the new object (from steps 1-3).

new不应该被用来调用一个有明确返回语句的函数

```js
// alternative to: var anotherPoint = new point.init(3,4)
var anotherPoint;
// this is a bare block to hide local `let` declarations
{
    // (Step 1)
    let tmpObj = {};

    // (Step 2)
    Object.setPrototypeOf(
        tmpObj, point.init.prototype
    );
    // or: tmpObj.__proto__ = point.init.prototype

    // (Step 3)
    let res = point.init.call(tmpObj,3,4);

    // (Step 4)
    anotherPoint = (
        typeof res !== "object" ? tmpObj : res
    );
}

// this approach 
var anotherPoint = {};
point.init.call(anotherPoint,5,6);
// new只能用于声明变量，call还可以添加属性
point.rotate.call( anotherPoint, /*angleRadians=*/Math.PI );
// anotherPoint = new point.rotate( anotherPoint, /*angleRadians=*/Math.PI ); // 会报错
```

**DOM** 

Pretty much all implementations of a click-handler mechanism are going to do something like the `.call(..)`, and they're going to set the DOM element (e.g., button) the event listener is bound to, as the *explicit context* for the invocation.

**arrow function**

this绑定函数运行时的上下文

When we write an arrow function, we know for sure that its binding will exactly be the current binding of whatever surrounding function is running, regardless of what the call-site of the arrow function looks like.

In an `=>` function, the `this` keyword... **is not a keyword**.

Find The Right Call-Site

```js
globalThis.value = { result: "Sad face" };

function one() {
    function two() {
        var three = {
            value: { result: "Hmmm" },

            fn: () => {
                const four = () => this.value;
                return four.call({
                    value: { result: "OK", },
                });
            },
        };
        return three.fn();
    };
    return two();
}

new one(); // { result: "Sad face" } this所以被分配了globalThis

// 调用栈
four         |
three.fn     |
two          | (this = globalThis)
one          | (this = {})
[ global ]   | (this = globalThis)
```

## Chapter 5: Delegatio

In fact, I would argue JS is inherently less class-oriented than the `class` keyword might appear. Because JS is a dynamic, prototypal language, its strong suit is actually... *delegation*.
