## 1、`registerApplication`

### 1.1 结构

```shell
registerApplication
-- sanitizeArguments 格式化用户传递的子应用配置参数
---- validateRegisterWithConfig 注册应用的时候传递的参数是对象
---- validateRegisterWithArguments 参数列表
---- sanitizeLoadApp 如果第二个参数不是一个函数，比如是一个包含已经生命周期的对象，则包装成一个返回 promise 的函数
---- sanitizeCustomProps 如果用户没有提供 props 对象，则给一个默认的空对象
---- sanitizeActiveWhen 保证activeWhen是一个返回boolean值的函数
------ toDynamicPathValidatorRegex 根据用户提供的baseURL，生成正则表达式
-- 将各个应用的配置信息都存放到 apps 数组中
-- ensureJQuerySupport 如果页面中使用了jQuery，则给jQuery打patch
-- reroute 更改app.status和执行生命周期函数
---- getAppChanges

app [{
	loadErrorTime: null,
	status: NOT_LOADED,
	parcels: {},
	devtools: {
		overlays: {
			options: {},
			selectors: [],
		},
	},
	name: 'app1',
    loadApp: 返回promise的函数,
    activeWhen: 返回boolean值的函数,
    customProps: {},
}]
```

### 1.2 `sanitizeArguments`

`validateRegisterWithConfig`

```js
// validateRegisterWithConfig
// 配置对象只能包括这四个key
const validKeys = ["name", "app", "activeWhen", "customProps"];
// 找到配置对象存在的无效的key
// Object.keys() 返回一个由给定对象自身的可枚举的字符串键属性名组成的数组
// Array.prototype.reduce(callbackFn, initialValue)对数组中的每个元素按序执行一个提供的 reducer 函数
const invalidKeys = Object.keys(config).reduce(
    // invalidKeys指定[]，没指定第一次运行就是数组第一个元
    // Array.prototype.indexOf(searchElement, fromIndex) 返回数组中第一次出现给定元素的下标，不存在返回 -1
    (invalidKeys, prop) =>
    validKeys.indexOf(prop) >= 0 ? invalidKeys : invalidKeys.concat(prop),
    []
);
// 如果存在无效的key，则抛出一个错误
if (invalidKeys.length !== 0) {

}

// 第三个参数，可以是一个字符串，也可以是一个函数，也可以是两者组成的一个数组，表示当前应该被激活的应用的baseURL
// 定义一个函数，方便数组进行判断
const allowsStringAndFunction = (activeWhen) => typeof activeWhen === "string" || typeof activeWhen === "function";
// Array.prototype.every(callbackFn, thisArg) 测试一个数组内的所有元素是否都能通过指定函数的测试
if (
    !allowsStringAndFunction(config.activeWhen) &&
    !(
        Array.isArray(config.activeWhen) &&
        config.activeWhen.every(allowsStringAndFunction)
    )
)

// 传递给子应用的props对象必须是一个对象
// typeof 可以判断 function 但是不能区分 Array   
// typeof class C {} === "function"; const c = new C(); object
function validCustomProps(customProps) {
  return (
    !customProps ||
    typeof customProps === "function" ||
    (typeof customProps === "object" &&
      customProps !== null &&
      !Array.isArray(customProps))
  );
}
```

`sanitizeLoadApp`

```js
// 保证第二个参数一定是一个返回 promise 的函数
// loadApp还可能是对象
function sanitizeLoadApp(loadApp) {
  if (typeof loadApp !== "function") {
    return () => Promise.resolve(loadApp);
  }

  return loadApp;
}
```

`sanitizeCustomProps`

```js
// 保证 props 不为 undefined，如果用户没有提供 props 对象，则给一个默认的空对象
function sanitizeCustomProps(customProps) {
  return customProps ? customProps : {};
}
```

`sanitizeActiveWhen`

```js
// 可以是一个字符串，也可以是一个函数，也可以是两者组成的一个数组
// 得到一个函数，函数负责判断浏览器当前地址是否和用户给定的baseURL相匹配，匹配返回true，否则返回false
function sanitizeActiveWhen(activeWhen) {
  // []
  let activeWhenArray = Array.isArray(activeWhen) ? activeWhen : [activeWhen];
  // 保证数组中每个元素都是一个函数
  activeWhenArray = activeWhenArray.map((activeWhenOrPath) =>
    typeof activeWhenOrPath === "function"
      ? activeWhenOrPath
      // activeWhen如果是一个路径，则保证成一个函数
      : pathToActiveWhen(activeWhenOrPath)
  );

  // 返回一个函数，函数返回一个 boolean 值
  return (location) =>
    activeWhenArray.some((activeWhen) => activeWhen(location));
}

export function pathToActiveWhen(path, exactMatch) {
  // app1 --> /^\/app1(\/.*)?(#.*)?$/i
  const regex = toDynamicPathValidatorRegex(path, exactMatch);
  // 函数返回boolean值，判断当前路由是否匹配用户给定的路径
  return (location) => {
    // compatible with IE10
    // const result = window.location.origin; // Returns:'https://developer.mozilla.org'
    let origin = location.origin;
    if (!origin) {
      origin = `${location.protocol}//${location.host}`;
    }
    // 假设文档中有一个 <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> 元素
    // const queryString = anchor.search; // 返回：'?q=123'
    const route = location.href
      .replace(origin, "")
      .replace(location.search, "")
      .split("?")[0];
    return regex.test(route);
  };
}
```

### 1.3 `reroute`

```shell
getAppChanges 获取4类应用
loadApps 首次加载 —— appsToLoad
-- toLoadPromise
---- getProps 得到传递给子应用的props
---- smellsLikeAPromise 判断一个变量是否为promise
---- flattenFnArray 把
-- callAllEventListeners
performAppChanges 后续路由切换 —— appsToLoad  appsToUnmount  appsToMount
-- getCustomEventDetail 发布全局事件
-- toUnloadPromise 移除
---- finishUnloadingApp
---- reasonableTime
-- toUnmountPromise 卸载
-- toLoadPromise 加载
-- tryToBootstrapAndMount
---- toBootstrapPromise 一次判断为true，才会执行初始化
---- shouldBeActive 第二次, 两次都为true才会去挂载
```

`loadApps`/`performAppChanges`

```js
// 未执行
appsThatChanged = appsToLoad;
return loadApps(); // 得到promise

function loadApps() {
    return Promise.resolve().then(() => { // 主流程结束立即执行下面逻辑 toLoadPromise-->loadPromises-->callAllEventListeners
        const loadPromises = appsToLoad.map(toLoadPromise);
        return (
        	// 保证所有加载子应用的微任务执行完成
       		Promise.all(loadPromises).then(callAllEventListeners)
       )
    })
}

// performAppChanges函数结构和loadApps类似，但是要处理4类应用
function performAppChanges() {
    return Promise.resolve().then(() => {
        return Promise.all(cancelPromises).then((cancelValues) => {
            // 移除应用 => 更改应用状态，执行unload生命周期函数，执行一些清理动作 其实一般情况下这里没有真的移除应用
            const unloadPromises = appsToUnload.map(toUnloadPromise);
            // 卸载应用，更改状态，执行unmount生命周期函数 卸载完然后移除，通过注册微任务的方式实现
            // 卸载还要执行移除
            const unmountUnloadPromises = appsToUnmount
            								.map(toUnmountPromise)
            								.map((unmountPromise) => unmountPromise.then(toUnloadPromise));
            const allUnmountPromises = unmountUnloadPromises.concat(unloadPromises); // 连接卸载和移除
            const unmountAllPromise = Promise.all(allUnmountPromises); // 执行完卸载和移除

            const loadThenMountPromises = appsToLoad.map((app) => {
                return toLoadPromise(app).then((app) =>
                    tryToBootstrapAndMount(app, unmountAllPromise)
                );
            });
            // 挂载排除加载
            const mountPromises = appsToMount
            						.filter((appToMount) => appsToLoad.indexOf(appToMount) < 0)
            						.map((appToMount) => {
                						return tryToBootstrapAndMount(appToMount, unmountAllPromise);
            						});
            
            return unmountAllPromise.then(() => { // 执行完卸载和移除
                return Promise.all(loadThenMountPromises.concat(mountPromises)) // 连接卸载和移除
			})
        }
    });
}
```

`toLoadPromise`

```js
export function toLoadPromise(appOrParcel) {
  return Promise.resolve().then(() => {
    // app打上loadPromise
    return (appOrParcel.loadPromise = Promise.resolve().then(() => {
        // 执行app的加载函数，并给子应用传递props => 用户自定义的customProps和内置的比如应用的名称、singleSpa实例
        const loadPromise = appOrParcel.loadApp(getProps(appOrParcel));
        // 加载函数需要返回一个promise
        if (!smellsLikeAPromise(loadPromise)) {}
        // 这里很重要，这个val就是示例项目中加载函数中return出来的window.singleSpa，这个属性是子应用打包时设置的
        // return window[app1] 可以拿到子应用生命周期函数
        return loadPromise.then((val) => {
            // window.singleSpa
            appOpts = val;
            // 设置app状态为未初始化，表示加载完了
            appOrParcel.status = NOT_BOOTSTRAPPED;
            // 在app对象上挂载生命周期方法，每个方法都接收一个props作为参数，方法内部执行子应用导出的生命周期函数，并确保生命周期函数返回一个promise
            appOrParcel.bootstrap = flattenFnArray(appOpts, "bootstrap");
            appOrParcel.mount = flattenFnArray(appOpts, "mount");
            appOrParcel.unmount = flattenFnArray(appOpts, "unmount");
            appOrParcel.unload = flattenFnArray(appOpts, "unload");
            appOrParcel.timeouts = ensureValidAppTimeouts(appOpts.timeouts);
        })
    })
  }
}
```

`flattenFnArray`

```js
function flattenFnArray (appOrParcel, lifecycle) {
  console.log('flattenFnArray');
  let fns = appOrParcel[lifecycle] || [];
  fns = Array.isArray(fns) ? fns : [fns];
  return function (props) {
    return fns.reduce((resultPromise, fn, index) => {
      console.log('reduce', resultPromise, fn, index)
      return resultPromise.then(() => {
        const thisPromise = fn(props);
        console.log('thisPromise props', thisPromise, props)
        return thisPromise;
      })
    }, Promise.resolve())
  }
}
const appOpts = {
  'appOpts': 'appOpts',
  'bootstrap': (props) => {
    console.log('appOpts bootstrap', props)
  }
}
const appOrParcel = {'appOrParcel': 'appOrParcel'}
appOrParcel.bootstrap = flattenFnArray(appOpts, "bootstrap");
console.log('appOpts appOrParcel', appOpts, appOrParcel)
const test = appOrParcel.bootstrap('hello');
console.log('appOpts appOrParcel after', test)
```
移除应用 `toUnloadPromise`
```js
// toUnloadPromise
export function toUnloadPromise(appOrParcel) {
    // 应用信息
    const unloadInfo = appsToUnload[toName(appOrParcel)];
	const unloadPromise = appOrParcel.status === LOAD_ERROR
        ? Promise.resolve()
        : reasonableTime(appOrParcel, "unload");
    // 在合理的时间范围内执行生命周期函数
    return unloadPromise
      .then(() => {
      	  // 一些清理操作
          finishUnloadingApp(appOrParcel, unloadInfo);
      })
}

/**
 * 合理的时间，即生命周期函数合理的执行时间
 * 在合理的时间内执行生命周期函数，并将函数的执行结果resolve出去
 * @param {*} appOrParcel => app
 * @param {*} lifecycle => 生命周期函数名
 */
export function reasonableTime(appOrParcel, lifecycle) {
	return new Promise((resolve, reject) => {
    // 这里很关键，之前一直奇怪props是怎么传递给子应用的，这里就是了，果然和之前的猜想是一样的
    // 是在执行生命周期函数时像子应用传递的props，所以之前执行loadApp传递props不会到子应用，
    // 那么设计估计是给用户自己处理props的一个机会吧，因为那个时候处理的props已经是{ ...customProps, ...内置props }
    appOrParcel[lifecycle](getProps(appOrParcel))
      .then((val) => {
        finished = true;
        resolve(val);
      })
      .catch((val) => {
        finished = true;
        reject(val);
      });
}

// 移除完成，执行一些清理动作，其实就是从appsToUnload数组中移除该app，移除生命周期函数，更改app.status
// 但应用不是真的被移除，后面再激活时不需要重新去下载资源,，只是做一些状态上的变更，当然load的那个过程还是需要的，这点可能需要再确认一下
function finishUnloadingApp(app, unloadInfo) {
  delete appsToUnload[toName(app)];
  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  delete app.unload;
  app.status = NOT_LOADED;
  unloadInfo.resolve();
}
```
监听路由变化
```shell
start
-- patchHistoryApi
---- patchedUpdateState
------ createPopStateEvent
------ urlReroute
```
具体实现
```js
// patchHistoryApi
window.history.pushState = patchedUpdateState(window.history.pushState, "pushState");
window.history.replaceState = patchedUpdateState(originalReplaceState, "replaceState");

// patchedUpdateState
/**
 * 通过装饰器模式，增强pushstate和replacestate方法，除了原生的操作历史记录，还会调用reroute
 * @param {*} updateState window.history.pushstate/replacestate
 * @param {*} methodName 'pushstate' or 'replacestate'
 */
function patchedUpdateState(updateState, methodName) {
  return function () {
    // 当前url
    const urlBefore = window.location.href;
    // pushstate或者replacestate的执行结果
    const result = updateState.apply(this, arguments);
    // pushstate或replacestate执行后的url地址
    const urlAfter = window.location.href;
    
    // 如果调用start传递了参数urlRerouteOnly为true，则这里不会触发reroute
    // https://zh-hans.single-spa.js.org/docs/api#start
    if (!urlRerouteOnly || urlBefore !== urlAfter) {
      urlReroute(createPopStateEvent(window.history.state, methodName));
    }
    return result;
  };
}

// createPopStateEvent
function createPopStateEvent(state, originalMethodName) {
  // https://github.com/single-spa/single-spa/issues/224 and https://github.com/single-spa/single-spa-angular/issues/49
  // We need a popstate event even though the browser doesn't do one by default when you call replaceState, so that
  // all the applications can reroute. We explicitly identify this extraneous event by setting singleSpa=true and
  // singleSpaTrigger=<pushState|replaceState> on the event instance.
  let evt;
  try {
    evt = new PopStateEvent("popstate", { state });
  } catch (err) {
    // IE 11 compatibility https://github.com/single-spa/single-spa/issues/299
    // https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-html5e/bd560f47-b349-4d2c-baa8-f1560fb489dd
    evt = document.createEvent("PopStateEvent");
    evt.initPopStateEvent("popstate", false, false, state);
  }
  evt.singleSpa = true;
  evt.singleSpaTrigger = originalMethodName;
  return evt;
}

// urlReroute
export function setUrlRerouteOnly(val) {
  urlRerouteOnly = val;
}
function urlReroute() {
  reroute([], arguments);
}

```

手写 single-spa 框架
```js
registerApplication 注册应用
-- getAppChanges 将所有的子应用分为三大类，待加载、待挂载、待卸载
-- reroute 除了初始化被调用，还会挂载到浏览器路由切换回调函数hashchange replaceState replaceState
---- loadApps 初始化加载，没有执行start
------ appsToLoad.map(toLoad) toLoad加载子应用
-------- 加载 app --> await app.app()，更改子应用状态，将子应用导出的生命周期函数挂载到 app 对象上
---- performAppChanges 非初始化，切换应用
------ appsToUnmount.map(toUnmount) 卸载
-------- 执行子应用卸载周期函数，更改状态子应用状态
------ appsToMount.map(tryToBoostrapAndMount) 初始化 + 挂载
-------- shouldBeActive(执行app.activeWhen(window.location))判断是否可以激活，可以则，执行子应用挂载周期函数，更改状态子应用状态

```

2、qiankun 
2.1 registerMicroApps 基于路由配置
```shell
registerMicroApps
-- registerApplication
---- loadApp
```
`ts`学习
```ts
import type { RegisterApplicationConfig, StartOpts, Parcel } from 'single-spa';

export type ObjectType = Record<string, any>;
// for the route-based apps
export type RegistrableApp<T extends ObjectType> = LoadableApp<T> & {
  loader?: (loading: boolean) => void;
  activeRule: RegisterApplicationConfig['activeWhen']; // 导入single-spa类型
};

// 类型参数的约束条件采用下面的形式
// TypeParameter表示类型参数，ConstraintType表示类型参数要满足的条件，即类型参数应该是ConstraintType的子类型
<TypeParameter extends ConstraintType>

function getFirst<T extends { length: number }>(arr:T[]):T {
  return arr[0];
}
// 函数调用时，需要提供类型参数
getFirst<number>([1, 2, 3])
// 不过为了方便，函数调用时，往往省略不写类型参数的值，让 TypeScript 自己推断
getFirst([1, 2, 3])
```
源码
```ts
// 过滤学习
// 防止微应用重复注册，得到所有没有被注册的微应用列表
// 有两个数组，A数组中item是否存在B数组中 filter中函数使用some
const unregisteredApps = apps.filter((app) => !microApps.some((registeredApp) => registeredApp.name === app.name));
// 所有的微应用 = 已注册 + 未注册的(将要被注册的)
microApps = [...microApps, ...unregisteredApps];

// 调用 single-spa 的 registerApplication 方法注册微应用
registerApplication({
  name,
	// 微应用的加载方法，Promise<生命周期方法组成的对象>
	app: async () => {
	  // 加载微应用时主应用显示 loading 状态
	  loader(true);
	  // 这句可以忽略，目的是在 single-spa 执行这个加载方法时让出线程，让其它微应用的加载方法都开始执行
	  await frameworkStartedDefer.promise;
	  // 核心、精髓、难点所在，负责加载微应用，然后一大堆处理，返回 bootstrap、mount、unmount、update 这个几个生命周期
	  const { mount, ...otherMicroAppConfigs } = (
	    await loadApp(
	      // 微应用的配置信息
	      { name, props, ...appConfig },
	      // start 方法执行时设置的配置对象
	      frameworkConfiguration,
	      // 注册微应用时提供的全局生命周期对象
	      lifeCycles
	    )
	  )();
	  return {
	    // todo 返回数组
	    mount: [async () => loader(true), ...toArray(mount), async () => loader(false)],
	    ...otherMicroAppConfigs,
	  };
	},
}）
```

2.2 start 启动 qiankun
```shell
doPrefetchStrategy 预加载
-- prefetchAfterFirstMounted 当第一个微应用挂载以后预加载这些微应用的静态资源
---- prefetch 预加载静态资源，在移动网络下什么都不做
------ isSlowNetwork 判断是否为弱网环境
------ window.requestIdleCallback 通过时间切片的方式去加载静态资源
-- prefetchImmediately 立即预加载这些关键微应用程序的静态资源
startSingleSpa
frameworkStartedDefer
```
`prefetch`
```js
/**
 * prefetch assets, do nothing while in mobile network
 * 预加载静态资源，在移动网络下什么都不做
 * @param entry
 * @param opts
 */
function prefetch(entry: Entry, opts?: ImportEntryOpts): void {
  // 通过时间切片的方式去加载静态资源，在浏览器空闲时去执行回调函数，避免浏览器卡顿
  requestIdleCallback(async () => {
    // 得到加载静态资源的函数
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(entry, opts);
    // 样式
    requestIdleCallback(getExternalStyleSheets);
    // js 脚本
    requestIdleCallback(getExternalScripts);
  });
}

/**
 * 在第一个微应用挂载之后开始加载 apps 中指定的微应用的静态资源
 * 通过监听 single-spa 提供的 single-spa:first-mount 事件来实现，该事件在第一个微应用挂载以后会被触发
 * @param apps 需要被预加载静态资源的微应用列表，[{ name, entry }, ...]
 * @param opts = { fetch , getPublicPath, getTemplate }
 */
function prefetchAfterFirstMounted(apps: AppMetadata[], opts?: ImportEntryOpts): void {
  // 监听 single-spa:first-mount 事件
  window.addEventListener('single-spa:first-mount', function listener() {
    // ...
    // 移除 single-spa:first-mount 事件
    window.removeEventListener('single-spa:first-mount', listener);
  });
```
应用间通信
```shell
initGlobalState 定义全局状态，并返回通信方法，一般由主应用调用，微应用通过 props 获取通信方法
-- emitGlobal 触发全局监听，执行所有应用注册的回调函数
-- getMicroAppStateActions 返回通信方法 
```
`setGlobalState`
```js
setGlobalState(state: Record<string, any> = {}) {
  // 旧的全局状态
  const prevGlobalState = cloneDeep(globalState);
  // cloneDeep接受一个对象，reduce返回一个新对象
  globalState = cloneDeep(
    // 循环遍历新状态中的所有 key
    Object.keys(state).reduce((_globalState, changeKey) => {
      if (isMaster || _globalState.hasOwnProperty(changeKey)) {
        // 主应用 或者 旧的全局状态存在该 key 时才进来，说明只有主应用才可以新增属性，微应用只可以更新已存在的属性值
        // 且不论主应用微应用只能更新一级属性，记录被改变的key，更新旧状态中对应的 key value
        // _globalState增加属性
        return Object.assign(_globalState, { [changeKey]: state[changeKey] });
      }
      return _globalState;
    }, globalState),
  );
}
```
全局的未捕获异常处理器
```js
// index.ts 可以导出 addErrorHandler removeErrorHandler addGlobalUncaughtErrorHandler removeGlobalUncaughtErrorHandler
export * from './errorHandler';

// errorHandler.ts
// single-spa 的异常捕获
export { addErrorHandler, removeErrorHandler } from 'single-spa';
// qiankun 的异常捕获
// 监听了 error 和 unhandlerejection 事件
export function addGlobalUncaughtErrorHandler(errorHandler: OnErrorEventHandlerNonNull): void {
  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', errorHandler);
}
// 移除 error 和 unhandlerejection 事件监听
export function removeGlobalUncaughtErrorHandler(errorHandler: (...args: any[]) => any) {
  window.removeEventListener('error', errorHandler);
  window.removeEventListener('unhandledrejection', errorHandler);
}
```