## Chapter 1: Asynchrony: Now & Later

线程（Thread）是最小的执行单元，而进程（Process）由至少一个线程组成

**Event Loop**

`setTimeout(..)` 并没有把你的回调函数挂在事件循环队列中。它所做的是设定一个定时器。当定时器到时后，环境会把你的回调函数放在事件循环中

```JS
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		}
	}
}
```

**Parallel Threading**

`async`: the gap between ***now* and later**

parallel: things being able to **occur simultaneously**

`JS`是单进程，但是可以异步

```js
var a = 20;
function foo() {a = a + 1;}
function bar() {a = a * 2;}
// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

函数顺序`foo`和`bar`执行顺序的不确定性就是通常所说的**竞态条件（race condition）**

**协调交互顺序来处理竞态条件**

```js
var res = [];
function response(data) {
	res.push( data );
}

// res有顺序之别
function response(data) {
	if (data.url == "http://some.url.1") {
		res[0] = data;
	}
	else if (data.url == "http://some.url.2") {
		res[1] = data;
	}
}
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

**协调合作关系处理竞态条件**

```js
var a, b;
function foo(x) {a = x * 2;baz();}
function bar(y) {b = y * 2;baz();}
function baz() {console.log(a + b);}

// foo和bar请求完成后才调用baz
function foo(x) {
	a = x * 2;
	if (a && b) {
		baz();
	}
}

function bar(y) {
	b = y * 2;
	if (a && b) {
		baz();
	}
}
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

**协调竞争关系处理竞态条件**

```js
// foo和bar是竞争关系
var a;
function foo(x) {
	if (a == undefined) {
		a = x * 2;
		baz();
	}
}
function bar(x) {
	if (a == undefined) {
		a = x / 2;
		baz();
	}
}
// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

**防止阻塞**

将任务分解成多个事件放进时间循环中处理，防止一次处理造成后续事件堵塞太久

```js
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
	// let's just do 1000 at a time
	var chunk = data.splice( 0, 1000 );

	// add onto existing `res` array
	res = res.concat(
		// make a new transformed array with all `chunk` values doubled
		chunk.map( function(val){
			return val * 2;
		} )
	);

	// anything left to process?
	if (data.length > 0) {
		// async schedule next batch
		setTimeout( function(){
			response( data );
		}, 0 );
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

## Chapter 3: Promises

### 3.1 Promises

回调是最基础的异步模式

回调两个主要缺陷：缺乏顺序性和可信任性

```js
// 创造了一个Promise实例
const promise = new Promise(function(resolve, reject) { // 由 JavaScript 引擎提供，不是回调函数
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。p.then(..) 调用本身返回了另外一个 promise
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});

// 实例
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}
timeout(100).then((value) => {
  console.log(value);
});
```

Calling Too Late

```js
let p = new Promise((resolve, reject) => {resolve()});
p.then( function(){
    p.then( function(){
        console.log( "C" );
    } );
    console.log( "A" );
} );
p.then( function(){
    console.log( "B" );
} );
```

Promise Scheduling Quirks

```js
var p3 = new Promise( function(resolve,reject){
	resolve( "B" );
} );

var p1 = new Promise( function(resolve,reject){
	resolve( p3 );
} );

var p2 = new Promise( function(resolve,reject){
	resolve( "A" );
} );

p1.then( function(v){
	console.log( v );
} );

p2.then( function(v){
	console.log( v );
} );

// A B  <-- not  B A  as you might expect
```

Swallowing Any Errors/Exceptions

```js
var p = new Promise( function(resolve,reject){
	foo.bar();	// `foo` is not defined, so error!
	resolve( 42 );	// never gets here :(
} );

p.then(
	function fulfilled(){
		// never gets here :(
	},
	function rejected(err){
		// `err` will be a `TypeError` exception object from the `foo.bar()` line.
	}
);

// p.then(..) 调用本身返回了另外一个 promise，正是这个 promise 将会因 TypeError 异常而被拒绝
var p = new Promise( function(resolve,reject){
	resolve( 42 );
} );
p.then(
	function fulfilled(msg){
		foo.bar();
		console.log( msg );	// never gets here :(
	},
	function rejected(err){
		// never gets here either :(
	}
);
```

Trustable Promise

```js
// two promises p1 and p2 will behave basically identically
var p1 = new Promise( function(resolve,reject){resolve( 42 );} );
var p2 = Promise.resolve( 42 ); // p1 p2行为是相同的

// if you pass a genuine Promise to Promise.resolve(..), you just get the same promise back
var p1 = Promise.resolve( 42 );
var p2 = Promise.resolve( p1 );
p1 === p2; // true

// Promise.resolve(..)/Promise.reject(..) will accept any thenable, you get back a real, genuine Promise
var p = {
    then: function(resolve,rejected) {
        rejected( "Oops" ); // 这里决定promise状态
        // resolve( 42 );
    }
};
Promise.resolve(p).then( // resolve只是展开p创建promise，如果是Promise.reject(p)则是这里决定promise状态
    function fulfilled(val){console.log( val )},
    function rejected(err){console.log(err)}
); // Oops
```

### 3.2 Chain Flow

- 每次你对 Promise 调用 then(..)，它都会创建并返回一个新的 Promise，我们可以将其链接起来；
- 不管从 then(..) 调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接 Promise（第一点中的）的完成。

```js
var p = Promise.resolve( 21 );

p.then( function(v){
    console.log( v );	// 21

    // fulfill `p2` with value `42` 会链式调用下一个then
    // return v * 2; // 调用resolve，如果出错就会调用reject

    // create a promise and return it
    return new Promise( function(resolve,reject){
        // reject( v * 2 );
        resolve( v * 2 );
    } );
}).then( function(v){
    console.log( v );
    return v * 2;
}, function(v){
    console.log('error' + v);	// error42
    return v * 2
}).then( function(v){
    return new Promise( function(resolve,reject){
        console.log(v * 3)
        // introduce asynchrony! 链式调用都是属于微任务，如果此时要异步使用setTimeout
        setTimeout( function(){
            resolve( v * 3 );
            console.log(`asynchrony ${v * 3}`)
        }, 1000 );
    } );
})

setTimeout( function(){console.log('setTimeout')}, 0) // 21 42 252 setTimeout asynchrony 252
```

### 3.3 Promise Patterns

**Promise.all**

接收一个 promise 的 iterable 类型（注：Array，Map，Set 都属于 ES6 的 iterable 类型）的输入，并且只返回一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)实例，那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且 reject 的是第一个抛出的错误信息。

 **`Promise.allSettled()`** 

方法返回一个在所有给定的 promise 都已经`fulfilled`或`rejected`后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

**Promise.race**

返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

**`finally()`** 

返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。

## Chapter 4: Generators

```js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: true }
console.log(hw.next())// { value: undefined, done: true }
```

`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

```js
function *foo(x) {
	var y = x * (yield "Hello"); // <-- yield a value!
	return y;
}
var it = foo( 6 );
var res = it.next(); // first `next()`, don't pass anything
res.value; // "Hello"
res = it.next( 7 ); // pass `7` to waiting `yield`
res.value; // 42
```

### 4.1 Breaking Run-to-Completion

```js
var x = 1;
function *foo() { // *必须有
    x++;
    yield; // pause!
    console.log( "x:", x );
}
function bar() {
    x++;
}
// construct an iterator `it` to control the generator
var it = foo();
// start `foo()` here!
it.next(); // 第一个 next(..) 总是启动一个生成器，并运行到第一个 yield 处
console.log(x); // 2
bar(); // 两个next中间可以运行其他代码
console.log(x); // 3
it.next(); // x: 3 第二个 next(..) 调用完成第一个被暂停的 yield 表达式  恢复了 foo() 并让它运行到结束，但这不是必需的
```

**Multiple Iterators**

```js
function *foo() {
	var x = yield 2;
	z++;
	var y = yield (x * z);
	console.log( x, y, z );
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2

val1 = it1.next( val2 * 10 ).value;	// 40  <-- x:20,  z:2
val2 = it2.next( val1 * 5 ).value; // 600 <-- x:200, z:3

it1.next( val2 / 2 ); // y:300 20 300 3
it2.next( val1 / 4 ); // y:10  200 10 3
```



Chapter 5: Program Performance



Chapter 6: Benchmarking & Tuning

