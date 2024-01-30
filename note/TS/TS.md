## 1、TypeScript 基本用法

**TypeScript 的类型检查只是编译时的类型检查，而不是运行时的类型检查**。一旦代码编译为 JavaScript，运行时就不再检查类型了。

TypeScript 项目里面，其实存在两种代码，一种是底层的“**值代码**”，另一种是上层的“**类型代码**”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法。

`tsc`命令输出报错信息，表示变量`foo`被错误地赋值为字符串。这种情况下，编译产物`app.js`还是会照样生成。

```shell
// app.ts
let foo:number = 123;
foo = 'abc'; // 报错

$ tsc app.ts
```

## 2、any，unknown，never

### 2.1 any

变量类型一旦设为`any`，TypeScript 实际上会**关闭这个变量的类型检查**（所有类型的值可以赋值给any）。即使有明显的类型错误，只要句法正确，都不会报错。

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。

`any`类型可以**赋值给其他任何类型的变量**，导致其他变量出错。

```ts
let x:any = 'hello';
let y:number;

y = x; // 不报错
y * 123 // 不报错
y.toFixed() // 不报错
```

### 2.2 unknown

`unknown`跟`any`一样，**所有类型的值都可以分配给`unknown`类型**。

`unknown`跟`any`区别

- `unknown`类型的变量，**不能直接赋值**给其他类型的变量（除了`any`类型和`unknown`类型）。
- `unknown`类型变量能够进行的运算是有限的，只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。(“类型缩小”)
- 不能直接调用`unknown`类型变量的方法和属性，**只有经过“类型缩小”，`unknown`类型变量才可以使用**。

```ts
let a:unknown = 1;
a + 1 // 报错
// 只有经过“类型缩小”，unknown类型变量才可以使用
if (typeof a === 'number') {
  let r = a + 10; // 正确
}
```

### 2.3 never

“空类型”，即该类型为空，**不包含任何值**（任何值都不可以赋值给never）。

`never`类型的一个重要特点是，可以**赋值给任意其他类型**。空集是任何集合的子集，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“**底层类型**”（bottom type）。

`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`（包含所有类型）一样，也属于 TypeScript 的**顶层类型**。

## 3、类型系统

### 3.1 基本类型

JavaScript 语言类型：boolean、string、number、bigint、symbol、object、undefined、null

- 所有类型的名称都是小写字母，首字母大写的`Number`、`String`等在 JavaScript 中都是内置对象，而不是类型名称
- bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数`target`不低于`es2020`）
- 如果没有声明类型的变量，被赋值为`undefined`或`null`，在关闭编译设置`noImplicitAny`和`strictNullChecks`时，它们的类型会被推断为`any`
- `undefined` 和 `null` 既可以作为值，也可以作为类型
- TypeScript 继承了 JavaScript 的类型设计，复杂类型由它们组合而成

### 3.2 包装对象类型

五种原始类型的值，都有对应的包装对象（wrapper object）

`Symbol()`和`BigInt()`不能作为构造函数使用，但是`Boolean()`、`String()`、`Number()`可以

`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此

TypeScript 对五种原始类型分别提供了大写和小写两种类型，**大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量**，不包含包装对象

```ts
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```

建议**只使用小写类型**，不使用大写类型，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```ts
const n1:number = 1;
const n2:Number = 1;

Math.abs(n1) // 1
Math.abs(n2) // 报错
```

### 3.3 `Object` 和 `object`

 `Object`

- 大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以**转成对象的值**，都是`Object`类型，这囊括了几乎所有的值（除了`undefined`和`null`）

- **空对象`{}`是`Object`类型的简写形式**

`object`

- 小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含**对象、数组和函数**，不包括原始类型的值

无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```ts
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

### 3.4 `undefined` 和 `null`

JavaScript 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。

**任何其他类型的变量都可以赋值为`undefined`或`null`**，以便跟 JavaScript 的行为保持一致。

只要打开`strictNullChecks`，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）,`undefined`和`null`这两种值也不能互相赋值了。

### 3.5 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

遇到`const`命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型，如果赋值为对象，并不会推断为值类型。

```ts
let x:'hello';
x = 'hello'; // 正确
x = 'world'; // 报错

// x 的类型是 "https"
const x = 'https';
// x 的类型是 { foo: number }
const x = { foo: 1 };

// 父类型不能赋值给子类型
let x:5 = 5;
let y:number = 4 + 1;
x = y; // 报错
y = x; // 正确

const x:5 = 4 + 1; // 报错
const x:5 = (4 + 1) as 5; // 正确
```

### 3.6 联合类型

联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示。

如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。

```ts
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

### 3.7 交叉类型

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号`&`表示。

交叉类型的主要用途是表示对象的合成。交叉类型常常用来为对象类型添加新属性。

```ts
type A = { foo: number };
type B = A & { bar: number };
```

### 3.8 type 命令

`type`命令用来定义一个类型的别名。

```ts
type Age = number;
let age:Age = 55;

// 别名不允许重名。
type Color = 'red';
type Color = 'blue'; // 报错
// 别名的作用域是块级作用域。这意味着，代码块内部定义的别名，影响不到外部。
if (Math.random() < 0.5) {
  type Color = 'blue';
}

// 别名允许嵌套。
type World = "world";
type Greeting = `hello ${World}`;
```

### 3.9 typeof 运算符

JavaScript 里面，`typeof`运算符只可能返回八种结果，而且都是字符串。

```ts
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
```

TypeScript 将`typeof`运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。

这种用法的`typeof`返回的是 TypeScript 类型，所以只能用在类型运算之中（即跟类型相关的代码之中），不能用在值运算。

```ts
const a = { x: 0 };
type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number

let a = 1;
let b:typeof a; // 类型运算
if (typeof a === 'number') { // 值运算
  b = a;
}

// typeof 的参数只能是标识符，不能是需要运算的表达式，Date()需要运算才知道结果
type T = typeof Date(); // 报错

// typeof命令的参数不能是类型。
type Age = number;
type MyAge = typeof Age; // 报错
```

## 4、数组

### 4.1 简介

TypeScript 数组有一个根本特征：所有成员的类型必须相同，但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员。

```ts
```



### 4.2 数组的类型推断



### 4.3 只读数组，const 断言



### 4.4 多维数组



