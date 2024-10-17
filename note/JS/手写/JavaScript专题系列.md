JavaScript专题
1、underscore 防抖

```js
let count = 1;
const container = document.getElementById('container');
const button= document.getElementById('button');
const setUseAction = debounce(getUserAction, 10000, false);
container.onmousemove = setUseAction;
button.addEventListener('click', function(){
  setUseAction.cancel();
});

function getUserAction() {
  console.log('getUserAction', this); // container.onmousemove = getUserAction this指向container
  container.innerHTML = count++;
  return count;
};

function debounce(func, wait, immediate) {
  let timeout, result;
  // container.onmousemove = debounce(getUserAction, 1000, true);
  console.log('debounce6', this); // debounce(getUserAction, 1000) this指向windown
  // 新增debounced变量,方便给函数增加取消事件
  const debounced = function () {
    console.log('debounce1 return', this) // 类似于container.onmousemove=function this指向container
    const context = this; // 保存this指向
    const args = arguments; // 保存参数
    if (timeout) {
      // 如果重复点击就取消定时器，重新设置一个新的定时器
      // clearTimeout并不会改变timeout的值
      clearTimeout(timeout);
    }
    if (immediate) {
      // 立即执行逻辑 如果已经执行过，不再执行
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      // setTimeout里面延迟执行函数，所以this指向window
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait)
    }
    // 当immediate为false的时候，因为在setTimeout才执行有结果，此时result值将会是undefined
    // 只在 immediate 为 true 的时候返回函数的执行结果
    return result;
  }
  // 增加取消事件
  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  }
  return debounced;
}
```
2、underscore 节流
```js
// 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
// 当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
// 比较两个方法：
// 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
// 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件
// leading：false 表示禁用第一次执行，trailing: false 表示禁用停止触发的回调，leading：false 和 trailing: false 不能同时设置
function throttle4(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    // if (!previous && options.leading === false) previous = now;
    // 可以让previous进入上面的条件，更新previous
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = new Date().getTime();
    // 让先前时间等于现在时间，既首次不执行
    if (!previous && options.leading === false) previous = now;
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      // 走第一种逻辑
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // setTimeout 保证最后一次可以执行
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttled;
}
```
3、数组去重
```js
function unique1(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    let j = 0;
    while (array[i] !== res[j] && j < res.length) {
      j++;
    }
    if (j === res.length) {
      res.push(array[i]);
    }
  }
  return res;
}

// 优化内层循环
function unique2(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    const currentEle = array[i];
    // includes(searchElement) indexOf(searchElement)
    // find/findLast(callbackFn, thisArg) findIndex/findLastIndex(callbackFn, thisArg)
    // some(callbackFn, thisArg) every(callbackFn, thisArg)-->都不等于
    if (res.indexOf(currentEle) === -1) {
      res.push(currentEle);
    }
    /*if (!res.some((item) => item === currentEle)) {
      res.push(currentEle);
    }
    if (res.every((item) => item !== currentEle)) {
      res.push(currentEle);
    }*/
  }
  return res;
}

// 自定义相等函数
function unique3(array, iteratee) {
  const res = [];
  const seen = [];
  for (let i = 0; i < array.length; i++) {
    const currentEle = array[i];
    // 如果没有传iteratee，seenEle就是currentEle
    const seenEle = iteratee ? iteratee(value, i, array) : currentEle;
    if (iteratee) {
      if (seen.indexOf(seenEle) === -1) {
        seen.push(seenEle);
        res.push(currentEle);
      }
    } else if (res.indexOf(currentEle) === -1) {
      res.push(currentEle);
    }
  }
  return res;
}

// 使用filter优化外层循环
function unique4(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

// 排序
function unique5(array) {
  // concat浅拷贝数组 sort会改变原数组
  return array.concat().sort().filter((item, index) => !index || item !== array[index - 1]);
}

// Set
function unique6(array) {
  return [...new Set(array)];
}

// Map
function unique7(array) {
  const res = new Map();
  // && 合并两个操作
  return array.filter((item) => !res.has(item) && res.set(item, 1));
}

// Object键值对 全部去重，对象序列化后变成string可以比较值而不是地址
function unique8(array) {
  const obj = {};
  return array.filter((item, index) => obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true));
}

const array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
// NaN === NaN {} === {} /a/正则对象
// indexOf底层使用 === 进行判断，因为 NaN ==== NaN的结果为 false，所以使用 indexOf 查找不到 NaN 元素
// Set 认为尽管 NaN === NaN 为 false，但是这两个元素是重复的，对象不能去重
```
4、 类型检查
```js
/**
 * Undefined、Null、Boolean、Number、String、Object
 * undefined、object、boolean、number、string、object、function
 * jQuery 判断数组类型采用了 Array.isArray
 */

/**
 * 进一步判断对象类型
 * 当 toString 方法被调用的时候，下面的步骤会被执行：
 * 1. 如果 this 值是 undefined，就返回 [object Undefined]
 * 2. 如果 this 的值是 null，就返回 [object Null]
 * 3. 让 O 成为 ToObject(this) 的结果
 * 4. 让 class 成为 O 的内部属性 [[Class]] 的值
 * 5. 最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串
 */
const number = 1;          // [object Number]
const string = '123';      // [object String]
const boolean = true;      // [object Boolean]
const und = undefined;     // [object Undefined]
const nul = null;          // [object Null]
const obj = {a: 1}         // [object Object]
const array = [1, 2, 3];   // [object Array]
const date = new Date();   // [object Date]
const error = new Error(); // [object Error]
const reg = /a/g;          // [object RegExp]
const func = function a(){}; // [object Function]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
function checkType() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]))
  }
}
checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

// 在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
// 只有 null === undefined 为 false
const class2type = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
  class2type["[object " + item + "]"] = item.toLowerCase();
})
function checkType1(obj) {
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}

// plainObject 对象是通过 "{}" 或 "new Object" 或 Object.create(null) 创建
// plainObject原型是Object.prototype或者null

// for...in 可枚举 继承
// Object.keys()/Object.values()/Object.entries() 可枚举 不包含继承来
// Object.getOwnPropertyNames()/hasOwnProperty() 包含不可枚举 不包含继承来
// in 包含不可枚举 继承
function isEmptyObject( obj ) {
  let name;
  for ( name in obj ) {
    return false;
  }
  return true;
}

// Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
function isWindow( obj ) {
  return obj != null && obj === obj.window;
}

// 数组和类数组都会返回 true
function isArrayLike(obj) {
  // obj 必须有 length属性
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = type(obj);
  // 排除掉函数和 Window 对象
  if (typeRes === "function" || isWindow(obj)) {
    return false;
  }
  return typeRes === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length - 1) in obj;
}

// 判断是不是 DOM 元素
isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};
```
5、深拷贝
```js
// concat 和 slice 是一种浅拷贝
// JSON.parse(JSON.stringify(arr)) 深拷贝，不能拷贝函数
function extend3() {
  let deep = false; // 默认不进行深拷贝
  let name, options, src, copy, clone, copyIsArray;
  let length = arguments.length;
  let i = 1; // 记录要复制的对象的下标
  // 第一个参数不传布尔值的情况下，target 默认是第一个参数
  let target = arguments[0] || {};
  // 如果第一个参数是布尔值，第二个参数是 target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为 {}
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空 避免 extend(a,,b) 这种情况
    if (options != null) {
      for (name in options) {
        src = target[name]; // 目标属性值
        copy = options[name]; // 要复制的对象的属性值
        /* extend2 逻辑
        if (deep && copy && typeof copy == 'object') {
          target[name] = extend2(deep, src, copy); // 递归调用
        } else if (copy !== undefined){
          target[name] = copy;
        }*/
        if (target === copy) { // 解决循环引用
          continue;
        }
        // 要递归的对象必须是 plainObject 或者数组
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          // 要复制的对象属性值类型需要与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = extend3(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
const a = extend3(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]); // [ 1, 2, 3, 7, 8, 9 ]
// extend2循环里面递归调用extend2传入分别是[5, 6, 7]，解构后{ '0': 5, '1': 6, '2': 7 }和{3: 1}合并
console.log(extend2(true, {value: {3: 1}}, {value: [5, 6, 7]})) // { value: { '0': 5, '1': 6, '2': 7, '3': 1 } }
// extend2循环里面递归调用extend2传入分别是{3: 1}，解构后obj1[3]=1和[5, 6, 7]合并
console.log(extend2(true, {value: [5, 6, 7]}, {value: {3: 1}})) // { value: [ 5, 6, 7, 1 ] }
console.log(extend3(true, {value: {3: 1}}, {value: [5, 6, 7]})) // { value: [ 5, 6, 7 ] }
console.log(extend3(true, {value: [5, 6, 7]}, {value: {3: 1}})) // { value: { '3': 1 } }
```
6、最大值
```js
// Math.max([value1[,value2, ...]])
// 如果有任一参数不能被转换为数值，则结果为 NaN，max 是 Math 的静态方法
const arr = [6, 4, 1, 8, 2, 11, 23];
// 1 原始方法
function maxNum1(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result =  Math.max(result, arr[i]);
  }
  return result;
}
// 2 reduce 没有指定初始值accumulator是arr[0]
function maxNum2(arr) {
  return arr.reduce((accumulator, currentValue)=> Math.max(accumulator, currentValue));
}
// 3 sort a>b调换排序[b, a]
function maxNum3(arr) {
  return arr.concat().sort((a, b) => a - b)[arr.length - 1];
}
// 4 apply
console.log(Math.max.apply(null, arr))
// 5 扩展运算符
console.log(Math.max(...arr))
```
7、扁平化
```js
arr.flat(Infinity)
flatMap(callbackFn, thisArg)
/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, output) {
  // 递归使用的时候会用到output
  output = output || [];
  let idx = output.length;
  for (let i = 0, len = input.length; i < len; i++) {
    let value = input[i];
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        let j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict){
      output[idx++] = value;
    }
  }
  return output;
}

/**
 * shallow true + strict false ：正常扁平一层 --> _.flatten: 在正常的扁平中，我们并不需要去掉非数组元素
 * shallow false + strict false ：正常扁平所有层
 * shallow true + strict true ：去掉非数组元素 --> _.union
 * shallow false + strict true ： 返回一个[]
 */
_.union = function() {
  return unique(flatten(arguments, true, true));
}
function difference(array, ...rest) {
  rest = flatten(rest, true, true);
  return array.filter(function(item){
    return rest.indexOf(item) === -1;
  })
}
```
8、查找指定元素
```js
// findIndex 和 findLastIndex 其实有很多重复的部分，利用传参的不同，返回不同的函数
function createIndexFinder(dir) {
  return function (array, predicate) {
    let length = array.length;
    let index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(array[index], index, array)) return index;
    }
    return -1;
  }
}
const findIndex2 = createIndexFinder(1);
const findLastIndex2 = createIndexFinder(-1);
console.log(findIndex2([1, 2, 3, 4], (item) => item === 3)) // 2
console.log(findLastIndex2([1, 2, 3, 4], (item) => item === 3)) // 2

function createIndexOfFinder(dir, predicate) {
  return function(array, item, idx){
    let length = array.length;
    let i = 0;
    // 确定查找位置
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }
    // 判断是否是 NaN
    if (item !== item) {
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i: -1;
    }
    // 查找下标 idx += dir dir会根据传入是-1还是1自行递增或递减
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}
const indexOf3 = createIndexOfFinder(1, findIndex2);
const lastIndexOf3 = createIndexOfFinder(-1, findLastIndex2);
console.log(indexOf3([1, 2, 3, 4, 5], 2, 1)) // 1
console.log(lastIndexOf3([1, 2, 3, 4, 5], 2, 1)) // 1
```
9、each
```js
// jQuery 的 each 函数，如果需要退出 each 循环可使回调函数返回 false
// 如果是数组，就调用 for 循环，如果是对象，就使用 for in（key） 循环
// Array.from(arrayLike, (element, index) => {}, thisArg)
// Array.from({length: 1000000}, (v, i) => i) 构建0-999999数组
function each2(obj, callback) {
  let length, i = 0;
  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      // 函数返回false结束循环
      // 使用call传递this call会导致性能损失
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }
  return obj;
}
```
10相等
```js
function eq(a, b, aStack, bStack) {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;
  // 判断 NaN
  if (a !== a) return b !== b;
  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  const type = typeof a;
  // 基本类型和函数肯定是不会相等的
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
}
function deepEq(a, b, aStack, bStack) {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  // 判断基本对象
  const className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }
  
  const areArrays = className === '[object Array]';
  // 构造函数
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false;
    const aCtor = a.constructor, bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (aCtor === bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  // 防止循环调用
  aStack = aStack || [];
  bStack = bStack || [];
  let length = aStack.length;
  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) { // 数组判断
    length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else { // 对象判断
  	// Object.keys() 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组
    let keys = Object.keys(a), key;
    length = keys.length;
    if (Object.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
```
11、柯里化
```js
// 第一版 将传参一次变成传参两次
const curry1 = function (fn) {
  // 相当于Array.prototype.slice --> arguments.slice
  const args = [].slice.call(arguments, 1);
  return function curry11 () {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
};

// 第二版，将传参一次变成随意传参多次
function curry2(fn, length) {
  /**
   * curry2(fn) --> curry2返回函数curry22(fn:hello)
   * fn("a") --> 调用curry2返回函数curry22(fn:hello)，并传递参数a
   *    因为参数长度小于初始fn要求参数长度，进入if分支，调用curry1，combined是初始fn和传参组合成的数组
   *    curry1会把数组第一个参数之外的参数保存在args，并返回一个函数curry11(fn:hello)，该函数作为参数再调用curry2
   *    调用curry2时传递length根据之前的传参数量相应减少，curry2返回函数curry22(fn:curry11(fn:hello))
   *
   * fn("b", "c") --> 调用curry2返回函数curry22(fn:curry11(fn:hello))，并传递参数b和c
   *    目前参数长度符合初始fn要求参数长度，进入else分支，调用fn，此时fn是调用curry1返回的函数curry11
   *    进入curry11，args(a) 和 arguments(b、c)合并成新参数newArgs，调用fn，此时fn是combined第一个参数，就是初始fn
   *
   * fn("b") --> 调用curry2返回函数curry22(fn:curry11(fn:hello))，并传递参数b
   *    目前参数长度小于初始fn要求参数长度，进入if分支，调用curry1，combined是curry11(fn:hello)和传参组合成的数组
   *    curry1会把数组第一个参数之外的参数保存在args，并返回一个函数curry11(fn:curry11(fn:hello))，该函数作为参数再调用curry2
   *    调用curry2时传递length根据之前的传参数量相应减少，curry2返回函数curry22(fn:curry11--b(fn:curry11--a(fn:hello)))
   * fn("c") --> 调用curry2返回函数curry22(fn:curry11--b(fn:curry11--a(fn:hello)))，并传递参数c
   *    目前参数长度符合初始fn要求参数长度，进入else分支，调用fn，此时fn是curry11--b(fn:curry11--a(fn:hello))
   *    进入curry11，args(b) 和 arguments(c)合并成新参数newArgs(b, c)，调用curry11--a(fn:hello)
   *    进入curry11，args(a) 和 arguments(b, c)合并成新参数newArgs(a, b, c)，调用hello
   */
  length = length || fn.length; // length 数据属性表示函数期望的参数数量
  const slice = Array.prototype.slice;
  return function curry22 () {
    if (arguments.length < length) {
      const combined = [fn].concat(slice.call(arguments));
      console.log('combined', combined);
      // 没有达到原函数参数值数量，apply(thisArg, argsArray)
      return curry2(curry1.apply(this, combined), length - arguments.length);
    } else {
      console.log('fn', fn);
      return fn.apply(this, arguments);
    }
  };
}
```
12偏函数
```js
/**
 * 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
 * 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
 */
const _ = {};
function partial2(fn) {
  const args = [].slice.call(arguments, 1);
  return function() {
    let position = 0, len = args.length;
    for(let i = 0; i < len; i++) {
      // 一开始传入参数_由后传入参数补上
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while(position < arguments.length) {
      // 新传入参数不是所有都用来补填_，把剩余的新参数补充进来
      args.push(arguments[position++])
    }
    return fn.apply(this, args);
  };
}
const subtract = function(a, b, c) { return a + b + c; };
subFrom20 = partial2(subtract, _, 20);
console.log(subFrom20(5, 6));
```
13 惰性函数
```js
/** 需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象 */
let foo = function() {
  let t = new Date();
  return function() {
    return t;
  };
};
```
14函数组合
```js
function compose2() {
  let args = arguments; // [fnA, fnB, fnC]
  let start = args.length - 1; // 2
  return function() {
    let i = start;
    let result = args[start].apply(this, arguments); // 调用fnC
    while (i--) {
      result = args[i].call(this, result)
    } // 调用fnB fnA
    return result;
  };
}
```
15函数记忆
```js
const memorize2 = function(func, hasher) {
  const memoize = function(key) {
    const cache = memoize.cache;
    const address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};
const memoizedAdd2 = memorize2(add, function(){
  const args = Array.prototype.slice.call(arguments)
  return JSON.stringify(args)
})
```
16尾调用
```js
function fibonacci1(n){
  return n < 2 ? n : fibonacci1(n - 1) * n;
}
function factorial2(n, res) {
  if (n === 1) return res;
  return factorial2(n - 1, n * res)
}
console.log(fibonacci1(4))
console.log(factorial2(4, 1))
```