apply、call、bind

Use .bind() when you want that function to later be called with a certain context, useful in events. 

Use .call() or .apply() when you want to invoke the function immediately, and modify the context.

```js
apply(thisArg, argsArray)
call(thisArg, arg1, /* …, */ argN)
bind(thisArg, arg1, arg2, /* …, */ argN)

function foo(a，b) {
	console.log（ "a：" ＋ a ＋ "， b：" ＋ b ）;
}

foo.apply( null， [2， 3] ); // a：2， b：3  把数组“展开”成参数
foo.call( null， 2， 3 ); // a：2， b：3
const bar = foo.bind（ null， 2 ）; // 使用 bind（..） 进行柯里化
bar(3); // a：2， b：3

function log(...args) {
  "use strict"; // prevent `this` from being boxed into the wrapper object
  console.log(this, ...args);
};
const boundLog = log.bind("this value", 1, 2);
const boundLog2 = boundLog.bind("new this value", 3, 4);
boundLog2(5, 6); // "this valu", 1, 2, 3, 4, 5, 6
```
