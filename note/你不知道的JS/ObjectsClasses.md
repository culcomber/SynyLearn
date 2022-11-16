## Chapter 1: Object Foundations

the pairing of a property name and a value often called a "property"

### 1.1 Defining Properties

**与JSON区别**

- JSON属性名必须用双引号包裹，对象

- JSON属性值必须是基本类型（literals），而不是表达式
- JSON不允许注释

**property name**

属性名会被转成string，所以不要使用对象作为属性名

```js
anotherObj = {
    [myObj]:  "<-- ...and so will this one", // [myObj]最终会保存为"[object Object]"
    ["x" + (21 * 2)]: true // 属性名可以是表达式，"x42": true
};

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



### 1.3 Assembling Properties



### 1.4 Deleting Properties



### 1.5 Determining Container Contents