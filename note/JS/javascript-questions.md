```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius, // 箭头函数this不会变，指向shape = {this-->window}
};

console.log(shape.diameter()); // 是直接取出shape.diameter地址
console.log(shape.perimeter());
// 20 and NaN
```

参考

```js
var obj ={
  foo: function () {
    console.log(this);
  }
};

// obj和obj.foo储存在两个内存地址，称为地址一和地址二
// obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj
obj.foo() // obj
// 直接取出地址二进行调用
(obj.foo = obj.foo)() // window
(false || obj.foo)() // window
(1, obj.foo)() // window
```

this指向

（1）全局环境：函数在全局环境下运行

（2）构造函数：指向实例对象

（3）对象的方法

箭头函数

对于普通函数来说，内部的`this`指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的`this`对象，内部的`this`就是定义时上层作用域中的`this`。也就是说，箭头函数内部的`this`指向是固定的，相比之下，普通函数的`this`指向是可变的。

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
foo.call({ id: 42 }); // id: 42 此时才生成箭头函数
// 如果是普通函数，执行时this应该指向全局对象window，这时应该输出21
// 箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42
```

4

```js
+true;
!'Lydia';
```

7

```js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

![image-20221216164407735](../assets/image-20221216164407735.png)

![image-20221216165610386](../assets/image-20221216165610386.png)

![image-20221216171408638](../assets/image-20221216171408638.png)

==todo 类型转换==

6

```js
let greeting;
greetign = {}; // Typo! const声明才必须初始化
console.log(greetign);
```

![image-20221216163558194](../assets/image-20221216163558194.png)

![image-20221216165818543](../assets/image-20221216165818543.png)

![image-20221216165932257](../assets/image-20221216165932257.png)

==事件==

![image-20221216163945903](../assets/image-20221216163945903.png)

`The base object is Object.prototype`

![image-20221216164220558](../assets/image-20221216164220558.png)

==todo 模板字符串==

![image-20221216164813312](../assets/image-20221216164813312.png)

![image-20221216172030838](../assets/image-20221216172030838.png)

==扩展运算符==

![image-20221216165014917](../assets/image-20221216165014917.png)

==缓存==

![image-20221216165147113](../assets/image-20221216165147113.png)

![image-20221216170357654](../assets/image-20221216170357654.png)

==try-catch==

![image-20221216170631020](../assets/image-20221216170631020.png)

==字符串 数组 方法==

![image-20221216170933942](../assets/image-20221216170933942.png)

![image-20221216171127501](../assets/image-20221216171127501.png)

![image-20221216171210547](../assets/image-20221216171210547.png)

![image-20221216171503467](../assets/image-20221216171503467.png)

![image-20221216171851057](../assets/image-20221216171851057.png)

![image-20221216171932826](../assets/image-20221216171932826.png)

![image-20221216172140262](../assets/image-20221216172140262.png)

==JSON.stringify==

![image-20221216172344958](../assets/image-20221216172344958.png)

![image-20221219092844272](../assets/image-20221219092844272.png)

![image-20221219110432370](../assets/image-20221219110432370.png)

```
reduce((previousValue, currentValue, currentIndex, array) => { /* … */ }, initialValue)
```

![image-20221219110238587](../assets/image-20221219110238587.png)

![image-20221219110523750](../assets/image-20221219110523750.png)

```js
var a = new Number('123'); // a === 123 is false
var b = Number('123'); // b === 123 is true
a instanceof Number; // is true
b instanceof Number; // is false
console.log(typeof a) // object
console.log(typeof b) // number
```

![image-20221219110838945](../assets/image-20221219110838945.png)

![image-20221219111344620](../assets/image-20221219111344620.png)

![image-20221219111516652](../assets/image-20221219111516652.png)

![image-20221219114742274](../assets/image-20221219114742274.png)

![image-20221219111745713](../assets/image-20221219111745713.png)

![image-20221219112354830](../assets/image-20221219112354830.png)

![image-20221219112758421](../assets/image-20221219112758421.png)

![image-20221219112849314](../assets/image-20221219112849314.png)

![image-20221219113415871](../assets/image-20221219113415871.png)

![image-20221219113613272](../assets/image-20221219113613272.png)

![image-20221219113711457](../assets/image-20221219113711457.png)

![image-20221219114321036](../assets/image-20221219114321036.png)

![image-20221219114836232](../assets/image-20221219114836232.png)

![image-20221219114951896](../assets/image-20221219114951896.png)

![image-20221219152715250](../assets/image-20221219152715250.png)

![image-20221229102943833](../assets/image-20221229102943833.png)

![image-20221229110354446](../assets/image-20221229110354446.png)

![image-20221229111053945](../assets/image-20221229111053945.png)

![image-20221229111201071](../assets/image-20221229111201071.png)

![image-20221229111506617](../assets/image-20221229111506617.png)

![image-20221229111606341](../assets/image-20221229111606341.png)

![image-20221229111713683](../assets/image-20221229111713683.png)

![image-20221229113620424](../assets/image-20221229113620424.png)

![image-20221229114121654](../assets/image-20221229114121654.png)

![image-20221229114547350](../assets/image-20221229114547350.png)

![image-20221229114839928](../assets/image-20221229114839928.png)

![image-20221229160742713](../assets/image-20221229160742713.png)

![image-20221229161211189](../assets/image-20221229161211189.png)![image-20221229161335686](../assets/image-20221229161335686.png)![image-20221229161423860](../assets/image-20221229161423860.png)![image-20221229161846854](../assets/image-20221229161846854.png)![image-20221229162004372](../assets/image-20221229162004372.png)![image-20221229162115081](../assets/image-20221229162115081.png)![image-20221229164846035](../assets/image-20221229164846035.png)![image-20221229164953826](../assets/image-20221229164953826.png)
