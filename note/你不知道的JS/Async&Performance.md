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

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
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



Chapter 4: Generators



Chapter 5: Program Performance



Chapter 6: Benchmarking & Tuning

