重学 TS
1、类型关系
类型之间的并集（`|`）会向上取顶部的类型。即 `never | 'a' => 'a'`，`unknown | 'a' => 'unknown'`
类型之间的交集（`&`）会向下取底部的类型。即 `never & 'a' = never`，`unknown & 'a' => 'a'`

- `bottom Type`: never
- `top type`: unknown
- 既是 `top` 也是 `bottom`: `any`
1.1 `never `
应用一: 联合类型中的过滤
```ts
type Exclude<T, U> = T extends U ? never : T; // T是联合类型，条件运算符会展开这个联合类型
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'> // type A = 'a'
```
应用二：防御性编程
```ts
interface Foo {   type: 'foo' } 
interface Bar {   type: 'bar' } 
type All = Foo | Bar
// 在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)
// 后续 type All = Foo | Bar | Baz，没有在 handleValue 里加上 Baz 的逻辑，在 default branch 里 val 会被收窄为 Baz，无法赋值给 never
typescript复制代码function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```
1.2 unknown
在一些无法确定函数参数（返回值）类型中进行类型检测
```ts
function test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length;    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length;      // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
```
1.3 函数
重载签名的类型不会合并：
```ts
// 重载签名（函数类型定义）
function toString(x: string): string;
function toString(x: number): string;
// 实现签名（函数体具体实现）
function toString(x: string | number) {
  return String(x)
}

function stringOrNumber(x): string | number {
  return x ? '' : 0
}

const input = stringOrNumber(1) // input 是 string 和 number 的联合类型
toString('hello') // ok
toString(2) // ok
toString(input) // error
```
1.4 类
结论是这样的：
 - 当把类直接作为类型时，该类型约束的是该类型必须是类的实例；即该类型获取的是该类上的实例属性和实例方法（也叫原型方法）； 当把typeof
 - 类作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法。
 - 静态属性和静态方法的继承，即属性和方法不是挂载到构造函数的prototype原型上的，而是直接挂载到构造函数本身。 
 - new关键字用在类型上，表示构造函数的类型。 
 - 当我们声明一个类的时候，其实声明的是这个类的实例类型和静态类型两个类型。

==todo 这里有一些信息和js中原型链形成的类的继承有相关性==
《TypeScript高级用法详解》
 《js中__proto__和prototype的区别和关系？》
《详解Typescript里的This》
 《Typescript: extending "this" inside class》

```ts
/**
 * 定义一个类
 */
class People {
  name: number;
  age: number;
  constructor() {}
}

// p1可以正常赋值
const p1: People = new People();
// 等号后面的People报错，类型“typeof People”缺少类型“People”中的以下属性: name, age
const p2: People = People;

// p3报错，类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性
const p3: typeof People = new People();
// p4可以正常赋值
const p4: typeof People = People;
```
2、刷题技巧
2.1 字符串、数组拆解
数组可以直接用类似 `js` 的 `[infer start, ...infer M, infer end]` 来获得一个数组的第一个和最后一个值。
字符串也是 `${infer L}${infer M}${infer R}`，但注意这里 `L` 是第一个字符，`M` 是第二个字符，`R` 是剩下的字符，如果字符只有2个，则 `R` 是`''`，如果字符只有一位，则无法这么拆解成3个变量，`T extends inferL{infer L}inferL{infer M}${infer R}` 条件会走到 `false` 的语句里去。
```ts
// 15 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
type Last<T extends any[]> = T extends [...infer B, infer P] ? P : never;
type arr1 = ['a', 'b', 'c']
type tail1 = Last<arr1> // expected to be 'c'

// 实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。
type Replace<S extends string, From extends string, To extends string> = From extends '' 
? S 
: S extends (`${infer L}${From}${infer R}`) ? `${L}${To}${R}`: S
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```
2.2 遍历
**联合类型**
类似结构的联合类型可以直接通过extends条件语句遍历到
```ts
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}
interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}
// 遍历联合类型 T
type LookUp<T, K extends string> = T extends { type: K } ? T : never;
type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```
**映射类型**
通过 `extends keyof T` 进行遍历
`Record<Keys, Type>` 返回一个对象类型，参数 `Keys` 用作键名，参数 `Type` 用作键值类型。
`[Prop in U]` 表示依次取出联合类型 `U` 的每一个成员。
`[Prop in keyof Obj]` 表示取出对象 `Obj` 的每一个键名。
```ts
type ObjectEntries<T extends Record<string, any>, K = keyof T> = K extends keyof T ? [K, T[K]]: [];
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```
**字符串**
```ts
type TrimLeft<T extends string> = T extends `${infer L}${infer R}`
  ? L extends " "|"\n"|"\t" ? TrimLeft<R> : T
  : never
type trimed = TrimLeft<'  Hello World '> // 应推导出 'Hello World '
```
2.3 映射类型 key值的交集与并集
```ts
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}
// keyof (A & B) ≡ keyof A | keyof B
type TestUnion = keyof foo | keyof coo; // 'name' | 'age' | 'sex'
type TestBoth = keyof (foo | coo);  // 'age'
```
2.4 判断两个类型相等
大多数非严格情况下的相等使用 `A extends B` 基本可以做到，但是枚举类型下，extends无法很好的区分是否可选，是否只读的区别。
```ts
type a = {a: string} extends {readonly a: string} ? true : false; // true
type b = {readonly a: string} extends {a: string} ? true : false; // true
type c = {a: string} extends {a?: string} ? true : false; // true
type d = {a?: string} extends {a: string} ? true : false; // false

// 严格的相等要借助函数的协变
typescript复制代码export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
```