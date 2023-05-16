// JS的八种内置类型
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
// null 和 undefined 是所有类型的子类型。 可以把 null 和 undefined 赋值给其他类型
// 在tsconfig.json指定了"strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
// number和bigint都表示数字，但是这两个类型不兼容
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 

// void表示没有任何类型，和其他类型是平等关系，不能直接赋值，在函数没有返回值时去声明void

// never类型表示的是那些永不存在的值的类型
let ne: never;
ne = (() => { throw new Error("异常"); })(); // OK异常
ne = (() => { while(true) {} })(); // OK死循环
// 使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码
type Foo = string | number;
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型any
// 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型
// 任何类型的值可以赋值给unknown，但unknown只能赋值给unknown和any
// 如果不缩小类型，就无法对unknown类型执行任何操作
function getDog() {
    return '123'
}
const dog: unknown = {hello: getDog};
// dog.hello(); // Error

// {} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型，而小 object 则表示非原始类型。

// 字面量类型
{
    let specifiedStr: 'this is string' = 'this is string';
    let specifiedNum: 1 = 1;
    let specifiedBoolean: true = true;
}
type Direction = 'up' | 'down';
function move(dir: Direction) {
  // ...
}
move('up'); // ok
// move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'

{
    const str = 'this is string'; // str: 'this is string'
    const num = 1; // num: 1
    const bool = true; // bool: true
}

{

    let str = 'this is string'; // str: string
    let num = 1; // num: number
    let bool = true; // bool: boolean
}

// Type is { x: number; y: number; }
const obj1={
    x:1,
    y:2
};
    
// Type is { x: 1; y: number; }
const obj2={
    x:1 as const,
    y:2
};
// Type is { readonly x: 1; readonly y: 2; }
const obj3={
    x:1,
    y:2
} as const;

// 联合类型
type Message = string | string[];
let greet = (message: Message) => {
  // ...
};

// 交叉类型
type IntersectionType = { id: number; name: string; } & { age: number };
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18
}

// ----------------------------Array----------------------------
// 对数组类型的定义有两种方式
let arr1: string[] = ["1","2"];
let arr2: Array<string> = ["1","2"];

// 定义联合类型数组，数组中既可以存储数值类型的数据, 也可以存储字符串类型的数据
let arr3: (number | string)[];
arr3 = [1, 'b', 2, 'c'];

// 定义指定对象成员的数组
// 接口（Interfaces）来定义对象的类型，对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
interface ArrObj {
    name:string,
    age:number
};
let arr4: ArrObj[] = [{name:'jimmy',age:22}];

interface A {x:{d:true},}
interface B {x:{e:string},}
interface C {x:{f:number},}
type ABC = A & B & C
let abc:ABC = {
    x:{
        d:true,
        e:'',
        f:666
    }
}

// ----------------------------Function----------------------------
// 函数声明
function sum(x: number, y: number): number {
    return x + y;
}

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 用接口定义函数类型
interface SearchFunc{
    (source: string, subString: string): boolean;
}

// 可选参数后面不允许再出现必需参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

// 参数默认值，有了默认值就不是必传
function buildName1(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat1 = buildName1('Tom', 'Cat');
let tom1 = buildName1('Tom');

// 剩余参数
// 扩展运算符在右边，const anotherObj = { ...myObj }，将把myObj属性"扩散"到对象anotherObj中
// 扩展运算符在左边，let [head, ...tail] = [1, 2, 3, 4]; head:1，tail:[2, 3, 4]，将剩余参数合并到数组赋值给tail
// 解构赋值 let [a,b,c] = [] {a,b,c} = {}
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a1 = [];
push(a1, 1, 2, 3);

// 函数重载
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');

// ----------------------------Function----------------------------
// 单个变量中存储不同类型的值，可以限制数组元素的个数和类型，适合用来实现多值返回
// 如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]
let x: [string, number];  // 类型必须匹配且个数必须为2
x = ['hello', 10]; // OK 
// x = ['hello', 10,10]; // Error 
// x = [10, 'hello']; // Error

// 元祖类型的解构赋值
let employee1: [number, string] = [1, "Semlinker"];
// let [id1, username1, age1] = employee1; // Error,js中age1是undefined

// 元组类型的可选元素
let optionalTuple2: [string, boolean?];
optionalTuple2 = ["Semlinker", true]; // optionalTuple : Semlinker,true
optionalTuple2 = ["Kakuqo"]; // optionalTuple : Kakuqo

// 元组类型的剩余元素，剩余元素代表元组类型是开放的，可以有零个或多个额外的元素
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];

// 只读的元组类型
const point: readonly [number, number] = [10, 20];
// point[0] = 1; // Error

// 类型推断:在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解
// 类型断言 
const arrayNumber: number[] = [1, 2, 3, 4];
// const greaterThan2: number = arrayNumber.find(num => num > 2); // Error ts(2322)
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;

// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue1: any = "this is a string";
let strLength1: number = (someValue1 as string).length;

// 非空断言：x! 将从 x 值域中排除 null 和 undefined 
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
// mayNullOrUndefinedOrString.toString(); // Error ts(2531)

type NumGenerator = () => number;
function myFunc(numGenerator: NumGenerator | undefined) {
  // const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}

// 确定赋值断言：在实例属性和变量声明后面!
let x1!: number;
initialize();
console.log(2 * x1); // Ok
function initialize() {
  x1 = 10;
}

// ----------------------------Interfaces----------------------------
interface Person {
    readonly name: string; // 只读属性
    age?: number; // 可选，这里真实的类型应该为：number | undefined
    [propName: string]: string | number | undefined; // 任意属性，确定属性和可选属性的类型都必须是它的类型的子集
}

// 类型断言
interface Props { 
    name: string; 
    age: number; 
    money?: number;
}
let p: Props = {
    name: "兔神",
    age: 25,
    money: -100000,
    girl: false
} as Props; // OK，本来定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的

// ----------------------------Type----------------------------
interface Point1 {
    x: number;
    y: number;
}
interface SetPoint1 {
    (x: number, y: number): void;
}

type Point = {
    x: number;
    y: number;
};
type SetPoint = (x: number, y: number) => void;
  
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B1 = typeof div;

// 接口可以定义多次，会被自动合并为单个接口
interface Point2a { x: number; }
interface Point2a { y: number; }
const point2: Point = { x: 1, y: 2 };

// 扩展
// 接口扩展接口
interface PointX1 {
    x: number
}
interface Point1 extends PointX1 {
    y: number
}
// 类型扩展类型
type PointX2 = {
    x: number
}
type Point2 = PointX2 & {
    y: number
}
// 接口扩展类型
type PointX3 = {
    x: number
}
interface Point3 extends PointX3 {
    y: number
}
// 类型扩展接口
interface PointX4 {
    x: number
}
type Point4 = PointX4 & {
    y: number
}

// ----------------------------泛型----------------------------
// T（Type）：表示抽象类型，只有在调用的时候才确定它的值；
// K（Key）：表示对象中的键类型；
// V（Value）：表示对象中的值类型；
// E（Element）：表示元素类型。
// 函数 identity，函数的参数可以是任何值，返回值就是将参数原样返回
function identity<T>(arg: T): T {
  return arg;
}

function identity1 <T, U>(value: T, message: U) : T {
    console.log(message);
    return value;
}
console.log(identity1<Number, string>(68, "Semlinker"));

// typeof 的主要用途是在类型上下文中获取变量或者属性的类型
interface Person1 {
  name: string;
  age: number;
}
const sem: Person = { name: "semlinker", age: 30 };
type Sem = typeof sem; // type Sem = Person

// 用于获取某种类型的所有键，其返回类型是联合类型
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}




