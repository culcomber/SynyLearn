JS是单线程，异步任务防止阻塞，异步操作的模式 

- 回调函数
- 事件监听
- 发布/订阅

```js
function f1(callback) { callback(); }
function f2() { ... }
f1(f2);
               
f1.on('done', f2);
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
               
jQuery.subscribe('done', f2);
function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
  }, 1000);
}
jQuery.unsubscribe('done', f2);
```

```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length === items.length) {
      final(results[results.length - 1]);
    }
  })
});
```

