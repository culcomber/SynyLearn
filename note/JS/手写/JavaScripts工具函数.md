[JavaScript 工具函数大全](https://juejin.cn/post/6844903966526930951?searchId=20240702162211A913644D28B51585CED1)
1、数组

```js
/**
 * 1、布尔全等判断
 * every((element,index,array) => {}, thisArg) 为数组中的每个元素执行的函数，所有元素通过测试返回真值，否则返回假值
 * 可以直接把Boolean当作函数传入
 */
const all = (arr, fn = Boolean) => arr.every(fn);
console.log('all', all([1,2,3])); // true
console.log('all', all([4,2,3], x => x > 1)); // true

/**
 * 2、检查数组各项相等
 * 与第一个元素做对比
 */
const allEqual = (arr) => arr.every((val) => val === arr[0]);
console.log('allEqual', allEqual([1, 2, 3, 4, 5, 6])) // false
console.log('allEqual', allEqual([1, 1, 1, 1])) // true

/**
 *  3、约等于
 *  利用两数差值小于最低阈值
 */
const approximatelyEqual = (num1, num2, epsilon = 0.001) => Math.abs(num1 - num2) < epsilon;
console.log('approximatelyEqual', Math.PI / 2.0, 1.5708); // 1.5707963267948966 1.5708
console.log('approximatelyEqual', approximatelyEqual(Math.PI / 2.0, 1.5708)); // true

/**
 * 4、数组转CSV格式（带空格的字符串）
 * join(separator) 将数组元素连接成一个字符串
 * map((element,index,array) => {}, thisArg) 新数组由原数组元素都调用函数后生成
 * 二维数组遍历可以在map里面调用map
 */
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map((valArr) => valArr.map((valItem) => `"${valItem}"`).join(delimiter)).join('\n');
console.log('arrayToCSV', arrayToCSV([['a', 'b'], ['c', 'd']])); // '"a","b"\n"c","d"'
console.log('arrayToCSV', arrayToCSV([['a', 'b'], ['c', 'd']], ';')); // '"a";"b"\n"c";"d"'

/**
 * 6、平均数
 * 剩余参数(函数的参数以...为前缀)是真正的Array实例，(...[a, b, c])剩余参数可以被解构
 */
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;
console.log('average', average(1, 2, 3)); // 2 nums:[ 1, 2, 3 ]
console.log('average', average(...[1, 2, 3])); // 2 nums:[ 1, 2, 3 ]
console.log('average', average([1, 2, 3])); // NaN nums:[ [ 1, 2, 3 ] ]

/**
 * 7、对象数组平均值
 * map可以将数组转变成另一种形式，map里面使用表达式，可以根据传出不同使用不同数组构造函数
 */
const averageObj = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) / arr.length;
console.log('averageObj', averageObj([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)); // 5
console.log('averageObj', averageObj([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')); // 5


/**
 * 8、拆分断言后的数组
 * push返回数组新length属性
 * reduce((accumulator, currentValue, currentIndex) => {}, initialValue)
 * 通过构造acc，reduce可以重构数组；,可以依次执行逻辑并返回最后一个操作数的值；arr[表达式]
 */
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(arr[i]), acc), [[], []]);
console.log('bifurcate', bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]));// [ ['beep', 'boop', 'bar'], ['foo'] ]

/**
 * 11、统计数值出现次数
 * 统计次数很适合reduce
 */
const countOccurrences = (arr, val) => arr.reduce((acc, cur) => cur === val ? acc + 1 : acc, 0);
console.log('countOccurrences', countOccurrences([1, 1, 2, 1, 2, 3], 1)); // 3

/**
 *  13、查找两个数组之间的差异
 *  让其中一个数组构建为Set，然后filter另一个数组，谁为主体谁fiter
 */
const difference = (arrA, arrB) => {
  // B为主体，B中的元素没有在A中出现
  /* const setA = new Set(arrA);
  return arrB.filter(item => !setA.has(item));*/

  // A为主体，A中的元素没有在B中出现
  const setB = new Set(arrB);
  return arrA.filter(item => !setB.has(item));
};
console.log('difference', difference([1, 2, 3], [1, 2, 4])); // [3]
console.log('difference', difference([1, 2, 3, 5], [1, 2, 4])); // [3, 5]
console.log('difference', difference([1, 2, 3], [1, 2, 4, 3])); // []

/**
 * 14、先执行再寻找差异
 * 因为要执行函数返回新数组，很适合用map执行函数后复用difference逻辑，但是A主体也被修改不是返回原值
 * 所以原数组只有在fiter比较的时候执行fn
 */
const differenceBy = (arrA, arrB, fn) => {
  // return difference(arrA.map(fn), arrB.map(fn));
  const setB = new Set(arrB.map(fn));
  return arrA.filter(item => !setB.has(fn(item)));
};
console.log('differenceBy', differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [1.2]
console.log('differenceBy', differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)); // [ { x: 2 } ]

/**
 * 20、两数组都符合条件的交集
 * 因为传入函数是需要A和B两个值，需要需要两重遍历A:filter B:findIndex
 * findIndex只要函数返回true就说明找到了
 * find是返回值不是唯一的不好判断，includes传入值不是函数，every要遍历所有值
 */
const intersectionWith = (arrA, arrB, fn) =>
  arrA.filter(itemA => arrB.findIndex((itemB) => fn(itemA, itemB)) !== -1)
console.log('intersectionWith', intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b))); // [1.5, 3, 0]

/**
 * 15、从数组顶部开始删除元素，直到传递的函数返回为true
 * slice(start, end) 包括start，不包括end；start默认值0；end默认值array.length
 * Array.prototype.splice(start, deleteCount, item1, …, itemN) 就地移除、替换、添加新的元素返回移除元素
 * String.prototype.split(separator, limit) 通过separator将字符串分割成字符串数组
 */
const dropWhile = (arr, func) => {
  // 注意slice之后的值要赋值给arr
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
console.log('dropWhile', dropWhile([1, 2, 3, 4], n => n >= 3)); // [3,4]
console.log('dropWhile', dropWhile([1, 2, 3, 4], n => n === 3)); // [3,4]

/**
 * 17、返回数组中某值的所有索引
 * filter返回的是原数组的值但是这里需要index
 * 返回非原数组的值：map适合返回和原数组同等长度，reduce可以返回符合条件
 */
const indexOfAll = (arr, val) =>
  arr.reduce((acc, curr, index) => curr === val ? [...acc, index] : acc, []);
  // arr.reduce((acc, curr, index) => (curr === val && acc.push(index), acc), [])
console.log('indexOfAll', indexOfAll([1, 2, 3, 1, 2, 3], 1)); // [0,3]
console.log('indexOfAll', indexOfAll([1, 2, 3], 4)); // []

/**
 * 21、minN 返回指定长度的升序数组
 * 先sort(就地对数组的元素进行排序，a-b>0，a在b后，如[b, a])然后再切割
 */
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
console.log('minN', minN([1, 2, 3])); // [1]
console.log('minN', minN([1, 2, 3], 2)); // [1,2]

/**
 * 22、根据条件反向筛选
 * filter返回取反
 */
const negate = fn => (...args) => !fn(...args);
const filterNegate = (arr, fn) => arr.filter(negate(fn));
console.log('filterNegate', filterNegate([1, 2, 3, 4, 5, 6], n => n % 2 === 0));

/**
 * 23、生成两数之间指定长度的随机数组
 * Array.from(arrayLike, mapFn(element, index) => newElement, thisArg)
 * Math.floor() 返回小于等于一个给定数字的最大整数
 * Math.random() 返回一个大于等于 0 且小于 1 的伪随机浮点数
 * 返回[min, max]区间 random * (max - min + 1) + min
 */
const randomIntArrayInRange = (min, max, len = 1) =>
  Array.from({ length: len }, () => Math.floor(Math.random() * (max - min + 1)) + min);
console.log('randomIntArrayInRange', randomIntArrayInRange(12, 35, 10)); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

/**
 * 24、在指定数组中获取随机数
 */
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
console.log('sample', sample([3, 7, 9, 11])); // 9

/**
 * 25、在指定数组中获取指定长度的随机数
 * 函数参数[...arr]解构赋值， [...arr]=传入数组，把数组的解构给arr
 * 扩展运算符用在右边是展开，用在左边是合并
 * 解构赋值也可以用来修改值，而不仅仅是初始化
 */
const shuffle = ([...arr]) => {
  let m = arr.length;
  /** Fisher-Yates 洗牌算法 */
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  console.log('shuffle', arr);
  return arr;
};
const sampleSize = ([...arr], n = 1) => shuffle(arr).slice(0, n);
console.log('sampleSize', sampleSize([1, 2, 3], 2)); // [3,1]
console.log('sampleSize', sampleSize([1, 2, 3], 4)); // [2,3,1]

/**
 * 25、根据parent_id生成树结构
 * filter父元素要找的子节点
 * nest(items, item.id) 递归传递是本身节点信息
 */
const nest = (items, id = null, link = 'parent_id') =>
  items.filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id)}));
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
console.log('nest', nest(comments)); // [{ id: 1, parent_id: null, children: [...] }]
```
2、函数
```js
/**
 * 1、捕获函数运行异常
 */
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
}
let elements = attempt(function(selector) {
  return new Error(selector);
}, '>_>');
if (elements instanceof Error) {
  console.log('attempt', elements);
  elements = [];
} // elements = []

/**
 * 2、推迟执行
 * console.log就是函数接收参数
 * setTimeout(functionRef, delay, param1, param2, … , paramN)
 * (fn, ...args) 是剩余参数，扩展运算符在左边，把一个个参数('defer', 'a')变成数组args
 * setTimeout(fn, 1, ...args) 扩展运算符在右边，把数组args解构成一个个参数('defer', 'a')
 */
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
defer(console.log, 'defer', 'a');
console.log('defer b');

/**
 * 3、运行多个 Promises
 * Promise((resolve, reject) => {})
 * Promise.prototype.then(() => {}, () => {}) then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）
 *    then里面的函数return的内容会传递给下一个promise，当然也可以return一个new Promise，构造函数里面有resolve，可以在适当时机触发
 * Promise.resolve(value)将给定的值转换为一个Promise示例
 * reduce可以构建promise链
 */
const delay = seconds => {
  return new Promise(resolve => {
    // setTimeout(resolve, seconds); // resolve是函数，可以直接传递给setTimeout
    //console.log('delay', seconds)
    setTimeout(() => {
      //console.log('runPromisesInSeries', seconds)
      resolve();
    }, seconds)
  })
};
/**
 * 第一遍 promiseChain：Promise.resolve() nextPromise：() => delay(1000)
 *    把nextPromise放到then里面，虽然promiseChain状态确定，但是then里面的promise是下一个微任务，
 *    等到主流程结束，执行promiseChain，既执行delay(1000)返回promise，resolve在setTimeout里面，1s后状态才确认
 * 第二遍 promiseChain：delay(1000)返回的promise nextPromise：() => delay(2000)])
 *    把nextPromise放到then里面，等1s后resolve才会执行nextPromise
 */
const runPromisesInSeries = promiseArr =>
  promiseArr.reduce((promiseChain, nextPromise) => promiseChain.then(nextPromise), Promise.resolve());
console.log('runPromisesInSeries', runPromisesInSeries([() => delay(1000), () => delay(2000)])); //依次执行每个Promises ，总共需要3秒钟才能完成
/**
 * 执行函数有没有return会影响返回的promise状态
 * Promise.resolve('1').then(fn1).then(fn2) 当前主流程结束进入微任务，fn1、fn2会被依次执行，然后再次进入主流程/setTimeout
 */
function test() {
  // return Promise.resolve().then(() => delay(500)).then(() => delay(1000));
  return new Promise((resolve) => {
    console.log('test'); // 主流程执行
    resolve(); // 微任务执行
  }).then(() => delay(500)).then(() => delay(1000))

}
function test1() {
  // Promise.resolve().then(() => delay(500)).then(() => delay(1000));
  new Promise((resolve) => {
    console.log('test1'); // 主流程执行
    resolve(); // 主流程执行
  }).then(() => delay(500)).then(() => delay(1000))
}
//console.log('test p', test()); // Promise { <pending> }
//console.log('test p1', test1()); // undefined

/**
 * 4、计算函数执行时间
 */
const timeTaken = callback => {
  console.time('timeTaken');
  const result = callback();
  console.timeEnd('timeTaken');
  return result;
}
console.log('timeTaken', timeTaken(() => Math.pow(2, 10))); // 1024, (logged): timeTaken: 0.02099609375ms

/**
 * 5、计算函数执行时间
 * (1)使用Object.create(null)创建一个空的hub对象。
 * (2)on，为事件创建一个数组（若不存在则为空数组），然后.push()将处理程序添加到该数组。
 * (3)emit，根据event参数解析处理程序数组，然后.forEach()通过传入数据作为参数来运行每个处理程序。
 * (4)off，用.findIndex()在事件数组中查找处理程序的索引，并使用.splice()删除，如果该订阅事件没有处理函数，删除该事件订阅。
 */
const createEventHub = () => ({
  // on/emit/off事件处理函数用到的对象
  hub: Object.create(null),
  on(event, handler) {
    // 如果不存在就新建，新建好后就可以push
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  emit(event, data) {
    // 括号里面可以放表达式，如果没有找到订阅事件，也可以用this.hub[event]?
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  off(event, handler) {
    // handler指向同一个地址
    const index = (this.hub[event] || []).findIndex(h => h === handler);
    if (index > -1) this.hub[event].splice(index, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  }
});
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;
// 订阅，监听不同事件
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);
// 发布：发出事件以调用所有订阅给它们的处理程序，并将数据作为参数传递给它们
hub.emit('message', 'hello world'); // 打印 'hello world' 和 'Message event fired'
hub.emit('message', { hello: 'world' }); // 打印 对象 和 'Message event fired'
hub.emit('increment'); // increment = 1
// 停止订阅
hub.off('message', handler);

/**
 * 8、以键的路径扁平化对象 keys得到key数组可以一个个处理，reduce可以构建返回的对象
 * (1)利用Object.keys(obj)联合Array.prototype.reduce()，以每片叶子节点转换为扁平的路径节点。
 * (2)如果键的值是一个对象，则函数使用调用适当的自身prefix以创建路径Object.assign()。
 * (3)否则，它将适当的前缀键值对添加到累加器对象。
 * (4)prefix除非您希望每个键都有一个前缀，否则应始终省略第二个参数。
 */
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, key) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[key] === 'object') { // 构建前缀
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else { // 最终返回，不用扁平化的就是key，需要扁平化在递归调用中构建
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {})
console.log('flattenObject', flattenObject({ a: { b: { c: 1 } }, d: 1 })); // { 'a.b.c': 1, d: 1 }

/**
 * 9、以键的路径展开对象
 * 利用字符串拼接对象然后JSON.parse转译
 * String.prototype.repeat(count)
 */
const unflattenObject = obj =>
  Object.keys(obj).reduce((acc, k) => {
    if (k.indexOf('.') !== -1) {
      const keys = k.split('.');
      // 构建对象
      Object.assign(acc, JSON.parse(
        '{' +
        keys.map((value, index) => index !== keys.length - 1 ? `"${value}":{` : `"${value}":`).join('') +
        obj[k] +
        '}'.repeat(keys.length)
      ))
    } else acc[k] = obj[k];
    return acc;
  }, {});
console.log('unflattenObject', unflattenObject({ 'a.b.c': 1, d: 1 })); // { a: { b: { c: 1 } }, d: 1 }
```
3、字符串
```js
/**
 * 1、获取字节数
 * String：length 返回字符串中的码元数量。JavaScript 使用 UTF-16 编码，其中每个 Unicode 字符可以编码为一个或两个码元，
 * 因此 length 返回的值可能与字符串中 Unicode 字符的实际数量不匹配。
 */
// const byteSize = str => new Blob([str])?.size;
const byteSize1 = str => str.length;
// console.log('byteSize', byteSize('😀')); // 4
// console.log('byteSize', byteSize('Hello World')); // 11
console.log('byteSize1', byteSize1('😀')); // 2
console.log('byteSize1', byteSize1('Hello World')); // 11

/**
 * 2、首字母大写
 * str[0].toUpperCase()直接修改字符串不生效，toUpperCase()返回大写之后的字符串
 * 类似数组的对象：字符串、DOM NodeList对象、arguments对象，可以在参数直接解构 const capitalize = ([first, ...rest]) => {}
 */
const capitalize = (str, isFirstOnly = false) => {
  const [first, ...rest] = isFirstOnly ? str.toLocaleLowerCase() : str;
  return first.toUpperCase() + rest.join('');
}
console.log('capitalize',capitalize('fooBar')); // 'FooBar'
console.log('capitalize',capitalize('fooBar', true)); // 'Foobar'

/**
 * 3、每个单词首字母大写
 * replace(pattern, str/fn) 词边界：\b
 */
const capitalizeEveryWord = str => str.replace(/[a-z]/g, char => char.toUpperCase());
console.log('capitalizeEveryWord', capitalizeEveryWord('hello world!')); // 'Hello World!'

/**
 * 5、银行卡号码校验（luhn算法）
 * reverse() 方法就地反转数组中的元素
 */
const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};
console.log('luhnCheck', luhnCheck('4485275742308327')); // true
console.log('luhnCheck', luhnCheck(123456789)); // false

/**
 * 6、将多行字符串拆分为行数组
 * ?代表“零个或一个”，同{0,1}  +代表“一个或多个”，同{1,}  *代表“零个及以上”，同{0,}
 * \r 回车，回到当前行的行首，而不会换到下一行  \n 换行，换到当前位置的下一行，而不会回到行首  \r\n表示回车换行
 */
const splitLines = str => str.split(/\r?\n/);
console.log('splitLines', splitLines('This\nis a\nmultiline\nstring.\n')); // ['This', 'is a', 'multiline', 'string.' , '']

/**
 * 7、删除字符串中的HTMl标签
 * 方括号 […] 中的几个字符或者字符类表示“搜索给定字符中的任意一个”
 * [^…]表示匹配所有 除了给定的字符 之外的任意字符
 */
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
console.log('stripHTMLTags', stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>')); // 'lorem ipsum'
```
4、对象
```js
/**
 * 1、一年中当前日期天数
 * getFullYear() 方法根据本地时间返回指定日期的年份
 * 1.无参数：当前的日期和时间 2.value(整数)时间或时间戳值 3.dateString日期字符串 4.dateObject日期对象
 * 5.日期和时间组件的单独值 new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
 */
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
console.log('dayOfYear', dayOfYear(new Date())); // 285

/**
 * 3、返回当前24小时制时间的字符串
 * toTimeString() 返回一个日期对象时间部分的字符串 14:39:07 GMT-0600 (PDT)
 * to类：从Date对象返回一个字符串，表示指定的时间。get类：获取Date对象的日期和时间。set类：设置Date对象的日期和时间。
 */
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
console.log('getColonTimeFromDate', getColonTimeFromDate(new Date())); // "08:38:00"

/**
 * 8、获取明天的字符串格式时间
 */
const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split('T')[0];
};
console.log('tomorrow', tomorrow()); // 2019-10-15 (如果明天是2019-10-15)

/**
 * 2、迭代属性并执行回调
 * Object.keys(obj)让对象变成数组然后forEach执行函数
 * for...in/for...of 也可以，Object.values()/Object.keys()/Object.entries() 只是返回值/属性数组
 */
const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));
forOwn({ foo: 'bar', a: 1 }, v => console.log('forOwn', v)); // 'bar', 1

/**
 * 5、检查值是否为特定类型
 * ![, null].includes(val) 排除undefied和null
 * Object实例的constructor属性返回一个引用，指向创建该实例对象的构造函数
 */
const is = (type, val) => ![, null].includes(val) && val.constructor === type;
console.log('is', is(Array, [1])); // true

/**
 * 9、全等判断
 * 核心在于Array.prototype.every()的使用
 */
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
console.log('equals', equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' })); // true
```
5、数字
```js
/**
 * 2、生成指定范围的随机小数
 * (max - min) 不用加1，因为证书的话要包一层Math.floor会往下取
 */
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
console.log('randomNumberInRange', randomNumberInRange(2, 10)); // 6.0211363285087005

/**
 * 3、四舍五入到指定位数
 * Number.prototype.toFixed() 由于浮点数精度问题四舍五入会不准确
 */
function round(number, precision) {
  return Math.round(+number + "e" + precision) / Math.pow(10, precision);
  //same as:
  //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}
console.log('round ', round (1.005, 2)); // 1.01

/**
 * 5、简单的货币单位转换
 * Intl国际化API
 */
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
console.log('toCurrency ', toCurrency(123456.789, 'EUR')); // €123,456.79
console.log('toCurrency ', toCurrency(322342436423.2435, 'JPY')); // ¥322,342,436,423
```
6、浏览器操作及其它
```js
/** 2 检查创建目录 */
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
// createDirIfNotExists('test');

/** 3 返回当前链接url */
const currentURL = () => window.location.href; // 'https://juejin.im'

/** 6 返回指定元素的生效样式 */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
// getStyle(document.querySelector('p'), 'font-size'); // '16px'

/** 8 校验指定元素的类名 */
const hasClass = (el, className) => el.classList.contains(className);
// hasClass(document.querySelector('p.special'), 'special'); // true

/** 10 HTTP 跳转 HTTPS */
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
}; // 若在`http://www.baidu.com`, 则跳转到`https://www.baidu.com`

/** 13、检查是否为浏览器环境 */
const isBrowser = () => ![typeof window, typeof document].includes('undefined');
console.log('isBrowser ', isBrowser()); // false

/** 19、检测移动/PC设备 */
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

/** 14、检查当前标签页是否活动 */
const isBrowserTabFocused = () => !document.hidden; // true

/** 15、转换nodeList为数组 */
const nodeListToArray = nodeList => [...nodeList];
// nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]

/** 16、随机十六进制颜色 toString(radix) */
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6); // "#e34155"
};

/** 17、平滑滚动至顶部 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/** 18、滚动到指定元素区域 */
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });

/** 20、返回当前的滚动位置 */
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
}); // {x: 0, y: 200}

/** 21、获取不同类型变量的长度 */
const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string'
        ? new Blob([val]).size
        : 0;
console.log('size ', size([1, 2, 3, 4, 5])); // 5
console.log('size ', size({ one: 1, two: 2, three: 3 })); // 3
// console.log('size ', size('size')); // 4

/** 22、escapeHTML：转义HTML */
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
console.log('escapeHTML ', escapeHTML('<a href="#">Me & you</a>')); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```
7、实现
```js
/**
 * 1、实现new操作符
 * (1)它创建了一个全新的对象。
 * (2)创建的对象的原型[[Prototype]]链接到这个函数的prototype对象上。
 * (3)它使this指向新创建的对象。
 * (4)如果函数没有返回对象类型Object，那么new表达式中的函数调用将返回该对象引用。
 */
function New(func) {
  const res = {}; // 字面量创建等同于new Object({})
  if (func.prototype !== null) { // 判断原型是否存在
    // 更改对象的 [[Prototype]] 在各个浏览器和 JavaScript 引擎上都是一个很慢的操作
    // res.__proto__ = func.prototype;
    Object.setPrototypeOf(res, func.prototype)
  }
  // const ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  const ret = func.apply(res, [...arguments].slice(1));
  // typeof能区分function，但是function是对象，typeof还会错把null当成对象
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  return res;
}
function A(name) { this.name = name; }
console.log('New', New(A, 'steve'), new A('steve')); // equals to

/**
 * 2、实现JSON.stringify
 * Boolean | Number| String 类型会自动转换成对应的原始值。
 * undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
 * 不可枚举的属性会被忽略
 * 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 */
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = []
    let arr = Array.isArray(obj)
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
  }
}
console.log('jsonStringify', jsonStringify({x : 5})) // "{"x":5}"
console.log('jsonStringify', jsonStringify([1, "false", false])) // "[1,"false",false]"
console.log('jsonStringify', jsonStringify({b: undefined})) // "{"b":"undefined"}"

/**
 * 3、实现JSON.parse
 * 避免在不必要的情况下使用eval，用eval()运行的字符串代码可能被恶意方（不怀好意的人）操控修改
 * Function与eval有相同的字符串参数特性
 */
function jsonParse(jsonStr) {
  return (new Function('return ' + jsonStr))();
  // return eval('(' + opt + ')');
}
console.log('jsonParse', jsonParse(jsonStringify({x : 5})))// Object { x: 5}

/**
 * 4、实现call或apply
 * fun.call(thisArg, arg1, arg2, ...) func.apply(thisArg, [argsArray])
 * 指定this到对象的属性并传入给定参数执行函数
 * 如果不传入参数，默认指向为 window
 */
Function.prototype.call2 = function(content = window) {
  content.fn = this;
  // 让arguments变成数组然后切割删除第一个this指向参数
  let args = [...arguments].slice(1);
  // 就像对象调用方法this指向对象
  let result = content.fn(...args);
  /**
   * let result;
   * if(arguments[1]) { // 参数形式 arguments[1]=[argsArray]
   *    result = context.fn(...arguments[1])
   * } else {
   *    result = context.fn()
   * }
   */
  delete content.fn;
  return result;
}
let foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.call2(foo, 'black', '18') // black 18 1

/**
 * 5、实现bind
 * 需要考虑实例化后对原型链的影响
 */
Function.prototype.bind2 = function(content) {
  if(typeof this != "function") {
    throw Error("not a function")
  }
  // 若没问参数类型则从这开始写
  let fn = this;
  let args = [...arguments].slice(1);
  let resFn = function() {
    console.log('resFn', this, this instanceof resFn)
    // content是需要bind绑定的this对象，this是调用函数的环境和let fn = this;不是同一个
    // fn = Function.prototype.bind2()  让new fn调用的this指向对象实例
    return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
  }
  function tmp() {}
  tmp.prototype = this.prototype;
  resFn.prototype = new tmp();
  return resFn;
}

/**
 * 6、实现继承
 * 继承就是修改原型链，然后保持住constructor
 */
function create(proto, cons) {
  function F(){}
  F.prototype = proto;
  const newPrototype = new F();
  newPrototype.constructor = cons;
  return newPrototype;
}

function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}
function Child(name, parentName) {
  this.name = name;
}
Child.prototype = create(Parent.prototype, Child);
const parent = new Parent('father');
parent.sayName();    // parent name: father
const child = new Child('son', 'father');
child.sayName(); // child name: son
console.log('constructor', child.constructor, parent.constructor);

/**
 * 7、柯里化
 */
function curry(fn, args) {
  var length = fn.length;
  var args = args || []; // 预设一开始不会传参
  return function(){
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this,fn,newArgs);
    }else{
      return fn.apply(this,newArgs);
    }
  }
}
const curry1 = (fn, arr = []) =>
  (...args) => (
    arg => arg.length === fn.length
      ? fn(...arg)
      : curry(fn, arg)
  )([...arr, ...args])

function multiFn(a, b, c) {
  return a * b * c;
}
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);
```
