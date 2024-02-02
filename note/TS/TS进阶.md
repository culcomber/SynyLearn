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

简介
可选属性
只读属性
属性名的索引类型
解构赋值
结构类型原则
严格字面量检查
最小可选属性规则
空对象

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