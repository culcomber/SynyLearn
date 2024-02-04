## 1、函数

### 1.1 简介

如果变量被赋值为一个函数，变量的类型有两种写法。

```ts
// 写法一
const hello = function (txt:string) {
  console.log('hello ' + txt);
}

// 写法二
const hello:
  (txt:string) => void
= function (txt) {
  console.log('hello ' + txt);
};

// 往往用type命令为函数类型定义一个别名，便于指定给其他变量。
type MyFunc = (txt:string) => void;
const hello:MyFunc = function (txt) {
  console.log('hello ' + txt);
};

// TypeScript 允许省略参数
let myFunc: (a:number, b:number) => number;
myFunc = (a:number) => a; // 正确
myFunc = (a:number, b:number, c:number) => a + b + c; // 报错
```

**Function 类型**

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。

Function 类型的函数可以接受任意数量的参数，每个参数的类型都是`any`，返回值的类型也是`any`，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。

### 1.2 参数

**A 可选参数**

参数名带有问号，表示该参数的类型实际上是`原始类型|undefined`，它有可能为`undefined`。

```ts
// 参数的类型实际上是原始类型|undefined
function f(x?:number) {
  // ...
}

f(); // OK
f(10); // OK
```

函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。

如果前部参数有可能为空，这时只能显式注明该参数类型可能为`undefined`。

函数体内部用到可选参数时，需要判断该参数是否为`undefined`。

```ts
let myFunc: (a:number, b?:number) => number; 
myFunc = function (x, y) {
  if (y === undefined) {
    return x;
  }
  return x + y;
}
```

**B 参数默认值**

可选参数与默认值不能同时使用。

设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。

设有默认值的参数，如果传入`undefined`，也会触发默认值。

```ts
function add(x:number = 0, y:number) {
  return x + y;
}

add(1) // 报错
add(undefined, 1) // 正确
```

**C 参数解构**

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// 参数解构可以结合类型别名（type 命令）一起使用，代码会看起来简洁一些。
type ABC = { a:number; b:number; c:number };
function sum({ a, b, c }:ABC) {
  console.log(a + b + c);
}
```

**D rest 参数**

rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。

```ts
// rest 参数为数组
function joinNumbers(...nums:number[]) {
  // ...
}

// rest 参数为元组
function f(...args:[boolean, number]) {
  // ...
}

// rest 参数甚至可以嵌套。
function f(...args:[boolean, ...string[]]) {
  // ...
}
```

**E `readonly` 只读参数**

如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上`readonly`关键字，表示这是只读参数。

```ts
function arraySum(
  arr:readonly number[]
) {
  // ...
  arr[0] = 0; // 报错
}
```

### 1.3 返回类型

**A void 类型**

void 类型允许返回`undefined`或`null`。函数的运行结果如果是抛出错误，也允许将返回值写成`void`。

如果打开了`strictNullChecks`编译选项，那么 void 类型只允许返回`undefined`。

**B never 类型**

`never`类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

- `never`类型表示函数**没有执行结束**，不可能有返回值；
- `void`类型表示函数正常执行结束，但是**不返回值**，或者说返回`undefined`。

```ts
//（1）抛出错误的函数。
function fail(msg:string):never {
  throw new Error(msg);
}

// （2）无限执行的函数。
const sing = function():never {
  while (true) {
    console.log('sing');
  }
};
```

一个函数如果某些条件下有正常返回值，另一些条件下抛出错误，这时它的返回值类型可以省略`never`。

`never`是 TypeScript 的唯一一个底层类型，所有其他类型都包括了`never`。从集合论的角度看，`number|never`等同于`number`。

```ts
function sometimesThrow():number {
  if (Math.random() > 0.5) {
    return 100;
  }

  throw new Error('Something went wrong');
}

const result = sometimesThrow();
```

### 1.4 其他函数

**A 高阶函数**

一个函数（高阶函数）的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

```ts
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

**B 函数重载**

有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。

TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。

TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。

```ts
function reverse(str:string):string;
function reverse(arr:any[]):any[];
function reverse(
  stringOrArray:string|any[]
):string|any[] {
  if (typeof stringOrArray === 'string')
    return stringOrArray.split('').reverse().join('');
  else
    return stringOrArray.slice().reverse();
}

// 对象的方法也可以使用重载。

class StringBuilder {
  #data = '';
  add(num:number): this;
  add(bool:boolean): this;
  add(str:string): this;
  add(value:any): this {
    this.#data += String(value);
    return this;
  }
  toString() {
    return this.#data;
  }
}
```

由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载，除非多个参数之间、或者某个参数与返回值之间，存在对应关系。

```ts
// 写法一
function len(s:string):number;
function len(arr:any[]):number;
function len(x:any):number {
  return x.length;
}

// 写法二
function len(x:any[]|string):number {
  return x.length;
}
```

**C 构造函数**

构造函数的类型写法，就是在参数列表前面加上new命令。

```ts
class Animal {
  numLegs:number = 4;
}
type AnimalConstructor = new () => Animal;
function create(c:AnimalConstructor):Animal {
  return new c();
}
const a = create(Animal);

// 构造函数还有另一种类型写法，就是采用对象形式。
type F = {
  new (s:string): object;
};

// 某些函数既是构造函数，又可以当作普通函数使用，比如Date()
type F = {
  new (s:string): object;
  (n?:number): number;
}
```

## 2、对象

### 2.1 简介

除了`type`命令可以为对象类型声明一个别名，TypeScript 还提供了`interface`命令，可以把对象类型提炼为一个接口。

一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。不能删除类型声明中存在的属性，修改属性值是可以的。

不区分对象自身的属性和继承的属性，一律视为对象的属性。

```ts
// 写法一
type MyObj = {
  x:number;
  y:number;
  toString(): string; // 继承的属性
};
const obj:MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}
const obj:MyObj = { x: 1, y: 1 };
```

### 2.2 对象属性

**A 可选属性**

可选属性等同于允许赋值为`undefined`，下面两种写法是等效的。

```TS
type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName?: string|undefined;
};
```

读取可选属性之前，必须检查一下是否为`undefined`。

只要同时打开`ExactOptionalPropertyTypes`和`strictNullChecks`，可选属性就不能设为`undefined`。

```ts
// 写法一
let firstName = (user.firstName === undefined) ? 'Foo' : user.firstName;
let lastName = (user.lastName === undefined) ? 'Bar' : user.lastName;

// 写法二
let firstName = user.firstName ?? 'Foo';
let lastName = user.lastName ?? 'Bar';
```

**B 只读属性**

只读属性只能在对象初始化期间赋值，此后就不能修改该属性。

如果属性值是一个对象，`readonly`修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

```ts
type Point = {
  readonly x: number;
  readonly y: number;
};

const p:Point = { x: 0, y: 0 };
p.x = 100; // 报错
```

如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。

```ts
interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let w:Person = {
  name: 'Vicky',
  age: 42,
};
let r:ReadonlyPerson = w;

w.age += 1;
r.age // 43
```

如果希望属性值是只读的，除了声明时加上`readonly`关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言`as const`。

```ts
const myUser = {
  name: "Sabrina",
} as const;
myUser.name = "Cynthia"; // 报错

// 变量myUser的类型声明，name不是只读属性，但是赋值时又使用只读断言as const。这时会以声明的类型为准，因为name属性可以修改。
const myUser:{ name: string } = {
  name: "Sabrina",
} as const;
myUser.name = "Cynthia"; // 正确
```

**C 属性名的索引类型**

`TypeScript` 允许采用属性名表达式的写法来描述类型，称为“属性名的索引类型”。

索引类型里面，最常见的就是属性名的字符串索引。

属性的索引类型写法，建议谨慎使用，因为属性名的声明太宽泛，约束太少。

```ts
// 声明type
type MyObj = {
  [property: string]: string
};
// 其他JS对象
type T1 = {
  [property: number]: string
};
type T2 = {
  [property: symbol]: string
};

const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
};
```

数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在 JavaScript 语言内部，所有的数值属性名都会自动转为字符串属性名。

类型MyType同时有两种属性名索引，但是数值索引与字符串索引冲突了，所以报错了。由于字符属性名的值类型是string，数值属性名的值类型只有同样为string，才不会报错。

```ts
type MyType = {
  [x: number]: boolean; // 报错
  [x: string]: string;
}
```

可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名不符合属性名索引的范围，两者发生冲突，就会报错。

```ts
type MyType = {
  foo: string;
  [x: string]: string;
}

// 属性名foo符合属性名的字符串索引，但是两者的属性值类型不一样，所以报错了。
type MyType = {
  foo: boolean; // 报错
  [x: string]: string;
}
```

**D 解构赋值**

解构赋值的类型写法，跟为对象声明类型是一样的。

```ts
const {id, name, price}:{
  id: string;
  name: string;
  price: number
} = product;
```

**E 结构类型原则**

只要对象 B 满足 对象 A 的结构特征，`TypeScript` 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）。

如果类型 B 可以赋值给类型 A，`TypeScript` 就认为 B 是 A 的子类型（subtyping），A 是 B 的父类型。子类型满足父类型的所有结构特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型。

```ts
type myObj = { x: number, y: number, };

function getSum(obj:myObj) {
  let sum = 0;
  for (const n of Object.keys(obj)) {
    // obj[n]取出的属性值不一定是数值（number），使得变量v的类型被推断为any
    const v = obj[n]; // 报错
    sum += Math.abs(v);
  }
  return sum;
}

function getSum(obj:MyObj) {
  // 函数体内部只使用了属性x和y，这两个属性有明确的类型声明，保证obj.x和obj.y肯定是数值
  return Math.abs(obj.x) + Math.abs(obj.y);
}
```

**F 严格字面量检查**

如果对象使用字面量表示，会触发 `TypeScript` 的严格字面量检查（strict object literal checking）。

如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。

```ts
const point:{  x:number; } = {
  x: 1,
  z: 1 // 报错
};

const myPoint = { x: 1, z: 1 };
const point:{ x:number; } = myPoint; // 正确
```

由于严格字面量检查，字面量对象传入函数必须很小心，不能有多余的属性。

编译器选项`suppressExcessPropertyErrors`，可以关闭多余属性检查。

```TS
interface Point {
  x: number;
  y: number;
}
function computeDistance(point: Point) { /*...*/ }

computeDistance({ x: 1, y: 2, z: 3 }); // 报错
computeDistance({x: 1, y: 2}); // 正确
```

**E 最小可选属性规则**

如果某个类型的所有属性都是可选的，那么该类型的对象必须至少存在一个可选属性，不能所有可选属性都不存在。这就叫做“最小可选属性规则”。

如果想规避这条规则，要么在类型里面增加一条索引属性（`[propName: string]: someType`），要么使用类型断言（`opts as Options`）。

```ts
type Options = {
  a?:number;
  b?:number;
  c?:number;
};

const opts = { d: 123 };
const obj:Options = opts; // 报错
```

### 2.3 空对象

变量`obj`的值是一个空对象，然后对`obj.prop`赋值就会报错。

空对象只能使用继承的属性，即继承自原型对象`Object.prototype`的属性。

```ts
const obj = {};
obj.prop = 123; // 报错
obj.toString() // 正确
```

需要分步声明，一个比较好的方法是，使用扩展运算符（`...`）合成一个新对象。

```ts
const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0, ...pt1, ...pt2
};
```

空对象作为类型，其实是`Object`类型的简写形式。各种类型的值（除了`null`和`undefined`）都可以赋值给空对象类型，跟`Object`类型的行为是一样的。

因为`Object`可以接受各种类型的值，而空对象是`Object`类型的简写，所以它不会有严格字面量检查，赋值时总是允许多余的属性，只是不能读取这些属性。

```ts
let d:{}; // 等同于 let d:Object;
d = {};
d = 2;
d = { x: 1 };

b.x // 报错
```

如果想强制使用没有任何属性的对象，可以采用下面的写法。

```ts
interface WithoutProperties {
  [key: string]: never;
}

// 报错
const a:WithoutProperties = { prop: 1 };
```

## 3、interface 接口


简介

interface 的继承
interface 继承 interface
interface 继承 type
interface 继承 class
接口合并
interface 与 type 的异同

## 4、class


简介

属性的类型
`readonly` 修饰符
方法的类型
存取器方法
属性索引
类的 interface 接口
implements 关键字
实现多个接口
类与接口的合并
Class 类型
实例类型
类的自身类型
结构类型原则
类的继承
可访问性修饰符
public
private
protected
实例属性的简写形式
静态成员
泛型类
抽象类，抽象成员
this 问题

## 5、泛型

简介
泛型的写法
函数的泛型写法
接口的泛型写法
类的泛型写法
类型别名的泛型写法
类型参数的默认值
数组的泛型表示
类型参数的约束条件
使用注意点