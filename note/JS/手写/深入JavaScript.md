[1、JavaScript 复杂判断的更优雅写法](https://juejin.cn/post/6844903705058213896?searchId=20240702162211A913644D28B51585CED1)
 1. if/else 
 2. switch 
 3. 一元判断时：存到Object里 
 4. 一元判断时：存到Map里
```js
const actions = {
  '1': ['processing','IndexPage'],
  '2': ['fail','FailPage'],
  'default': ['other','Index'],
}
const actions = new Map([
  [1, ['processing','IndexPage']],
  [2, ['fail','FailPage']],
  ['default', ['other','Index']]
])
let action = actions.get(status) || actions.get('default')
```
 6. 多元判断时：将condition拼接成字符串存到Object里 
 7. 多元判断时：将condition拼接成字符串存到Map里
```js
const actions = {
  'guest_1':()=>{/*do sth*/},
  'guest_2':()=>{/*do sth*/},
  //....
}
const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])
let action = actions[`${identity}_${status}`] || actions['default']
```
 8. 多元判断时：将condition存为Object存到Map里 
```js
const actions = new Map([
  [{identity:'guest',status:1},()=>{/*do sth*/}],
  [{identity:'guest',status:2},()=>{/*do sth*/}],
  //...
])

const onButtonClick = (identity,status)=>{
  let action = [...actions].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```
 9. 多元判断时：将condition写作正则存到Map里
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
```

[2、JavaScript 执行机制](https://juejin.cn/post/6844903512845860872?searchId=20240702162211A913644D28B51585CED1#heading-4)
2.1 then里面的代码时在当前宏任务结束后的微任务中执行，尽管Promise里面代码立即执行确认了成功状态
```js
new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});
console.log('代码执行结束');

//"马上执行for循环啦"
//"代码执行结束"
//"执行then函数啦"
```

2.2 一个setTimeout就是一个宏任务，如果setTimeout里面有Promise，setTimeout执行完后，进入Promise微任务
```js
setTimeout(function() {
  console.log('2');
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5')
  })
})

setTimeout(function() {
  console.log('9');
  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12')
  })
})
// 2 4 5 9 11 12
```
2.3 process.nexttick(node)是在宏任务结束后微任务开始执行前的回调，整个脚本就是一个宏任务，js执行每次都是先执行一遍当前队列中的所有宏任务，再执行回调，再执行所有微任务，然后再执行下一轮。

[3、JavaScript闭包](https://juejin.cn/post/6844903858636849159?searchId=20240702162211A913644D28B51585CED1)

如果**函数参数**没有默认值，就只有一个函数作用域，如果函数参数有默认值，函数的参数就会形成一个作用域，保存参数的值

`JS`执行分为编译阶段和执行阶段，编译阶段会产生执行上下文，执行阶段会在执行上下文查找相关变量
**执行上下文**：
	- **变量环境**`var`声明变量和`function`声明函数会被存放到变量环境中，进入**全局或函数作用域** var的**创建、初始化undefined**被提升，function的**创建、初始化、赋值**均会被提升
	- **词法环境**`let`、`const`的**创建**被提升，编译阶段会被存放到词法环境，当**进入块级作用域**时（如果进入函数，函数最外层声明的let会被压入词法环境），会把块级作用域内let、`const`生成的变量压入词法环境中，块环境结束，相关变量会弹出栈
	-  **outer**和函数位置有关，在全局就指向全局，在A函数内就指向A函数
	- **this**和执行上下文一样有三种，全局this指向window，函数this在通过object调用时指向object（setTimeout指向window），new指向新生成对象，apply、call指向方法传入参数，箭头函数不生成执行上下文没有this
**调用栈**就是用来管理这些执行上下文，编译只执行一次，所以执行上下文一开始就确定了。**当调用一个函数的时候，函数体内的代码会被编译**，并创建函数执行上下文，并压入调用栈，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
**执行上下文**有三种：全局、函数、`eval`
**作用域**有三种：全局、函数、块级
**作用域链**：词法环境-->变量环境-->outer-->词法环境-->变量环境-->outer...
**A函数返回B函数**，B使用A里面的变量，B是A的闭包，A运行结束，执行上下文清除，B形成的**闭包**存在