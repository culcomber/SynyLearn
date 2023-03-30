# `todo`

<img src="assets/image-20230111151344950.png" alt="image-20230111151344950" style="zoom:80%;" />

87 | 程序员练级攻略：前端基础和底层原理
88 | 程序员练级攻略：前端性能优化和框架

收集资料——整体了解——重点细节深入——实践

收藏夹--清单

------

程序员修炼之道 The Pragmatic Programmer

代码整洁之道 Clean Code

程序员的职业素养 The Clean Code

领域驱动设计和实践 Domain-Driven Design

测试驱动的面向对象软件开发 Growing Object-Oriented Software, Guided by Tests

持续交付 Continuous Delivery



不要学习微服务框架，学习演进式架构（Evolutionary Architecture）。

不要学习新的编程语言，学习代码整洁之道、设计模式、领域驱动设计（`DDD`）。

不要学习 `LeSS` 和规模化敏捷框架（`SAFe`），学习精益生产原则（Lean manufacturing principles）。

不要学习 `Hystrix`，学习容错模式（Fault Tolerance Patterns）。

不要学习 Docker，学成持续交付。

不要学习 Angular、React 和 `Vue`，学习 Web、HTTP 和 REST。

------

# 1 基础知识

## 1.1 浏览器

### 知识点

- 1

  基础：计算机原理、编译原理、数据结构、算法、设计模式、编程范式等基本知识了解

  网络：HTTP、TCP、`UDP`、`WebSocket`、Cookie、Session、跨域、缓存、协议的了解

- 2

- 编译原理

  1.理解代码到底是什么，计算机如何将代码转换为可以运行的目标程序

  2.正则表达式的匹配原理和性能优化

  3.如何将JavaScript代码解析成抽象语法树(AST)

  4.`base64`的编码原理

  5.几种进制的相互转换计算方法，在JavaScript中如何表示和转换

- 网络协议

  1.理解什么是协议，了解TCP/IP网络协议族的构成，每层协议在应用程序中发挥的作用

  2.三次握手和四次挥手详细原理，为什么要使用这种机制

  3.有哪些协议是可靠，TCP有哪些手段保证可靠交付

  4.`DNS`的作用、`DNS`解析的详细过程，`DNS`优化原理

  5.`CDN`的作用和原理

  6.HTTP请求报文和响应报文的具体组成，能理解常见请求头的含义，有几种请求方式，区别是什么

  7.HTTP所有状态码的具体含义，看到异常状态码能快速定位问题

  8.HTTP1.1、HTTP2.0带来的改变

  9.HTTPS的加密原理，如何开启HTTPS，如何劫持HTTPS请求

  10.理解WebSocket协议的底层原理、与HTTP的区别

- 设计模式

  1.熟练使用前端常用的设计模式编写代码，如单例模式、装饰器模式、代理模式等

  2.发布订阅模式和观察者模式的异同以及实际应用

  3.可以说出几种设计模式在开发中的实际应用，理解框架源码中对设计模式的应用

- 浏览器API

  1.浏览器提供的符合W3C标准的DOM操作API、浏览器差异、兼容性

  2.浏览器提供的浏览器对象模型 (BOM)提供的所有全局API、浏览器差异、兼容性

  3.大量DOM操作、海量数据的性能优化(合并操作、Diff、requestAnimationFrame等)

  4.浏览器海量数据存储、操作性能优化

  5.`DOM`事件流的具体实现机制、不同浏览器的差异、事件代理

  6.前端发起网络请求的几种方式及其底层实现、可以手写原生ajax、fetch、可以熟练使用第三方库

  7.浏览器的同源策略，如何避免同源策略，几种方式的异同点以及如何选型

  8.浏览器提供的几种存储机制、优缺点、开发中正确的选择

  9.浏览器跨标签通信

- 浏览器原理

  1.各浏览器使用的JavaScript引擎以及它们的异同点、如何在代码中进行区分

  2.请求数据到请求结束与服务器进行了几次交互

  3.可详细描述浏览器从输入URL到页面展现的详细过程

  4.浏览器解析HTML代码的原理，以及构建DOM树的流程

  5.浏览器如何解析CSS规则，并将其应用到DOM树上

  6.浏览器如何将解析好的带有样式的DOM树进行绘制

  7.浏览器的运行机制，如何配置资源异步同步加载

  8.浏览器回流与重绘的底层原理，引发原因，如何有效避免

  9.浏览器的垃圾回收机制，如何避免内存泄漏

  10.浏览器采用的缓存方案，如何选择和控制合适的缓存方案

- 前端安全

  1.`XSS`攻击的原理、分类、具体案例，前端如何防御

  2.`CSRF`攻击的原理、具体案例，前端如何防御

  3.`HTTP`劫持、页面劫持的原理、防御措施

### mini project

[全栈公开课 2022](https://fullstackopen.com/zh/)

[**`Node.js`**: *Write your own `bittorrent` client*](https://allenkim67.github.io/programming/2016/05/04/how-to-make-your-own-bittorrent-client.html)

[**`Node.js`**: *Build a `DNS` Server in `Node.js`*](https://engineerhead.github.io/dns-server/)

[**`Node.js`**: *Create a `CLI `tool in `Javascript`*](https://citw.dev/tutorial/create-your-own-cli-tool)

[**`Node.js`**: *How to create a real-world Node `CLI app` with Node*](https://medium.freecodecamp.org/how-to-create-a-real-world-node-cli-app-with-node-391b727bbed3)

## 1.2 HTML/`CSS`

### 知识点

- 掌握图形学，webgl或熟练使用threejs框架，熟练canvas相关渲染及动画操作的优先。

  - 学习过图形学相关知识，知道矩阵等数学原理在动画中的作用，知道三维场景需要的最基础的构成，能用threejs搭3d场景，知道webgl和threejs的关系。
  - 知道canvas是干嘛的，聊到旋转能说出canvas的api。
  - 知道css动画，css动画属性知道关键字和用法(换句话说，电话面试会当场出题要求口喷css动画，至少能说对大概，而不是回答百度一下就会用)。
  - 知道js动画，能说出1~2个社区js动画库，知道js动画和css动画优缺点以及适用场景。
  - 知道raf和其他达到60fps的方法。

- 熟悉各种Web前端技术，包括HTML/XML/CSS等，有基于Ajax的前端应用开发经验。

  - HTML方面包括但不限于：语义化标签，history api，storage，ajax2.0等。
  - CSS方面包括但不限于：文档流，重绘重排，flex，BFC，IFC，before/after，动画，keyframe，画三角，优先级矩阵等。
  - 知道axios或同级别网络请求库，知道axios的核心功能。
  - 能口喷xhr用法，知道网络请求相关技术和技术底层，包括但不限于：content-type，不同type的作用；restful设计理念；cors处理方案，以及浏览器和服务端执行流程；口喷文件上传实现；
  - 知道如何完成登陆模块，包括但不限于：登陆表单如何实现；cookie登录态维护方案；token base登录态方案；session概念；

- 2

- HTML

  1.从规范的角度理解HTML，从分类和语义的角度使用标签

  2.常用页面标签的默认样式、自带属性、不同浏览器的差异、处理浏览器兼容问题的方式

  3.元信息类标签(head、title、meta)的使用目的和配置方法

  4.`HTML5`离线缓存原理

  5.可以使用Canvas API、SVG等绘制高性能的动画

- CSS

  1.`CSS`盒模型，在不同浏览器的差异

  2.`CSS`所有选择器及其优先级、使用场景，哪些可以继承，如何运用at规则

  3.`CSS`伪类和伪元素有哪些，它们的区别和实际应用

  4.`HTML`文档流的排版规则，`CSS`几种定位的规则、定位参照物、对文档流的影响，如何选择最好的定位方式，雪碧图实现原理

  5.水平垂直居中的方案、可以实现6种以上并对比它们的优缺点

  6.BFC实现原理，可以解决的问题，如何创建BFC

  7.可使用`CSS`函数复用代码，实现特殊效果

  8.PostCSS、Sass、Less的异同，以及使用配置，至少掌握一种

  9.CSS模块化方案、如何配置按需加载、如何防止CSS阻塞渲染

  10.熟练使用`CSS`实现常见动画，如渐变、移动、旋转、缩放等等

  11.`CSS`浏览器兼容性写法，了解不同`API`在不同浏览器下的兼容性情况

  12.掌握一套完整的响应式布局方案

- 手写

  1.手写图片瀑布流效果

  2.使用`CSS`绘制几何图形（圆形、三角形、扇形、菱形等）

  3.使用纯`CSS`实现曲线运动（贝塞尔曲线）

  4.实现常用布局（三栏、圣杯、双飞翼、吸顶），可是说出多种方式并理解其优缺点

### mini project

[**`CSS`**: *A search engine in `CSS`*](https://stories.algolia.com/a-search-engine-in-css-b5ec4e902e97)

[响应式布局万圣节网站](https://github.com/bedimcode/responsive-halloween-website) 

[手绘组件库](https://chr15m.github.io/DoodleCSS/) 

## 1.3 `JS`

### 知识点

- JavaScript各种概念都得了解，《JavaScript语言精粹》这本书的目录都得有概念，并且这些核心点都能脱口而出是什么。这里列举一些做参考：

  - 知道组合寄生继承，知道class继承。

  - 知道怎么创建类function + class。

  - 知道闭包在实际场景中怎么用，常见的坑。

  - 知道模块是什么，怎么用。

  - 知道[event loop](https://www.zhihu.com/search?q=event loop&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2671717786})是什么，能举例说明event loop怎么影响平时的编码。

  - 掌握基础数据结构，比如堆、栈、树，并了解这些数据结构计算机基础中的作用。

  - 知道`ES6`数组相关方法，比如`forEach`，map，reduce。

- 1

  语法：JavaScript、`ECMAScript`、`CSS`、`TypeScript`、HTML、`Node.js` 等语法的了解和使用

- 2

- JavaScript基础

  - 变量和类型
  - 原型和原型链
  - 作用域和闭包
  - 执行机制
  - 语法和API

- 数据结构和算法

  - JavaScript编码能力
  - 手动实现前端轮子
  - 数据结构
  - 算法

- TypeScript

  1.理解泛型、接口等面向对象的相关概念，`TypeScript`对面向对象理念的实现

  2.理解使用`TypeScript`的好处，掌握`TypeScript`基础语法

  3.`TypeScript`的规则检测原理

  4.可以在React、`Vue`等框架中使用`TypeScript`进行开发
  
- [事件循环](https://www.youtube.com/watch?v=8aGhZQkoFbQ)   [`EventLoop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

### mini project

Template Engine

- [**JavaScript**: *JavaScript template engine in just 20 lines*](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)
- [**JavaScript**: *Understanding JavaScript Micro-`Templating`*](https://medium.com/wdstack/understanding-javascript-micro-templating-f37a37b3b40e)

`Regex` Engine

- [**JavaScript**: *Build a `Regex` Engine in Less than 40 Lines of Code*](https://nickdrane.com/build-your-own-regex/)
- [**JavaScript**: *How to implement regular expressions in functional `javascript` using derivatives*](http://dpk.io/dregs/toydregs)
- [**JavaScript**: *Implementing a Regular Expression Engine*](https://deniskyashif.com/2019/02/17/implementing-a-regular-expression-engine/)

other

- [**JavaScript**: *Build Your Own Module Bundler - `Minipack`*](https://github.com/ronami/minipack)
- [**`TypeScript`**: *Tiny Package Manager: Learns how `npm` or Yarn works*](https://github.com/g-plane/tiny-package-manager)
- [**`Node.js`**: *Build a static site generator in 40 lines with `Node.js`*](https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/)
- [Build a Jupyter Notebook Extension](https://link.medium.com/wWUO7TN8SS)
- [**JavaScript**: *Learn JavaScript Promises by Building a Promise from Scratch*](https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720)
- [**JavaScript**: *Implementing promises from scratch (TDD way)*](https://www.mauriciopoppe.com/notes/computer-science/computation/promises/)
- [**JavaScript**: *Implement your own — call(), apply() and bind() method in JavaScript*](https://blog.usejournal.com/implement-your-own-call-apply-and-bind-method-in-javascript-42cc85dba1b)

- Build a Progressive Web Application (`PWA`)
  - [Part 1](https://bitsofco.de/bitsofcode-pwa-part-1-offline-first-with-service-worker/)
  - [Part 2](https://bitsofco.de/bitsofcode-pwa-part-2-instant-loading-with-indexeddb/)
  - [Part 3](https://bitsofco.de/bitsofcode-pwa-part-3-push-notifications/)
- [Build A Native Desktop App with JS](https://medium.freecodecamp.org/build-native-desktop-apps-with-javascript-a49ede90d8e9)
- Build a Powerful API with NodeJs,GraphQL and Hapi
  - [Part I](https://medium.com/@wesharehoodies/how-to-setup-a-powerful-api-with-nodejs-graphql-mongodb-hapi-and-swagger-e251ac189649)

# 2 工程化

## 2.1 前端框架

### 知识点

- 熟练掌握React前端框架，了解技术底层。同时了解vue以及angular等其他框架者优先。

  - 知道react常见优化方案，脱口而出常用生命周期，知道他们是干什么的。
  - 知道react大致实现思路，能对比react和js控制原生dom的差异，能口喷一个简化版的react。
  - 知道diff算法大致实现思路。
  - 对state和props有自己的使用心得，结合受控组件、hoc等特性描述，需要说明各种方案的适用场景。

- 熟练掌握react生态常用工具，redux/react-router等。

  - 知道react-router，redux，[redux-thunk](https://www.zhihu.com/search?q=redux-thunk&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2671717786})，react-redux，immutable，antd或同级别社区组件库。
  - 知道vue和angular对应全家桶分别有哪些。
  - 知道浏览器react相关插件有什么，怎么用。
  - 知道react-router v3/v4的差异。
  - 知道`antd`组件化设计思路。
  - 知道thunk干嘛用的，怎么实现的。

- 1

  框架：React、`Vue`、Egg、`Koa`、Express、`Webpack` 等原理的了解和使用

- 2

- React

  1.`React`和`vue` 选型和优缺点、核心架构的区别

  2.`React`中`setState`的执行机制，如何有效的管理状态

  3.`React`的事件底层实现机制

  4.`React`的虚拟DOM和`Diff`算法的内部实现

  5.`React`的Fiber工作原理，解决了什么问题

  6.React Router和Vue Router的底层实现原理、动态加载实现原理

  7.可熟练应用React API、生命周期等，可应用HOC、render props、Hooks等高阶用法解决问题

  8.基于React的特性和原理，可以手动实现一个简单的React

- Vue

  1.熟练使用Vue的API、生命周期、钩子函数

  2.`MVVM`框架设计理念

  3.`Vue`双向绑定实现原理、`Diff`算法的内部实现

  4.`Vue`的事件机制

  5.从template转换成真实DOM的实现机制

- 数据流管理

  1.掌握React和Vue传统的跨组件通信方案，对比采用数据流管理框架的异同

  2.熟练使用`Redux`管理数据流，并理解其实现原理，中间件实现原理

  3.熟练使用`Mobx`管理数据流，并理解其实现原理，相比`Redux`有什么优势

  4.熟练使用`Vuex`管理数据流，并理解其实现原理

  5.以上数据流方案的异同和优缺点，不情况下的技术选型

### React 

**mini project**

[**JavaScript**: *Build a ride hailing `app` with React Native*](https://pusher.com/tutorials/ride-hailing-react-native)

- [Create Serverless React.js Apps](http://serverless-stack.com/)
- [Create a Trello Clone](http://codeloveandboards.com/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/)
- [Create a Character Voting App with React, Node, MongoDB and SocketIO](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio)
- [React Tutorial: Cloning Yelp](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/)
- [Build a Full Stack Movie Voting App with Test-First Development using Mocha, React, Redux and Immutable](https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
- [Build a Twitter Stream with React and Node](https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js)
- [Build A Simple Medium Clone using React.js and Node.js](https://medium.com/@kris101/clone-medium-on-node-js-and-react-js-731cdfbb6878)
- [Integrate MailChimp in JS](https://medium.freecodecamp.org/how-to-integrate-mailchimp-in-a-javascript-web-app-2a889fb43f6f)
- [Build A Chrome Extension with React + Parcel](https://medium.freecodecamp.org/building-chrome-extensions-in-react-parcel-79d0240dd58f)
- [Build A ToDo App With React Native](https://blog.hasura.io/tutorial-fullstack-react-native-with-graphql-and-authentication-18183d13373a)
- [Make a Chat Application](https://medium.freecodecamp.org/how-to-build-a-chat-application-using-react-redux-redux-saga-and-web-sockets-47423e4bc21a)
- [Create a News App with React Native](https://medium.freecodecamp.org/create-a-news-app-using-react-native-ced249263627)
- [Learn Webpack For React](https://medium.freecodecamp.org/learn-webpack-for-react-a36d4cac5060)
- [Testing React App With Puppeteer and Jest](https://blog.bitsrc.io/testing-your-react-app-with-puppeteer-and-jest-c72b3dfcde59)
- [Build Your Own React Boilerplate](https://medium.freecodecamp.org/how-to-build-your-own-react-boilerplate-2f8cbbeb9b3f)
- [Code The Game Of Life With React](https://medium.freecodecamp.org/create-gameoflife-with-react-in-one-hour-8e686a410174)
- [A Basic React+Redux Introductory Tutorial](https://hackernoon.com/a-basic-react-redux-introductory-tutorial-adcc681eeb5e)
- [Build an Appointment Scheduler](https://hackernoon.com/build-an-appointment-scheduler-using-react-twilio-and-cosmic-js-95377f6d1040)
- [Build A Chat App with Sentiment Analysis](https://codeburst.io/build-a-chat-app-with-sentiment-analysis-using-next-js-c43ebf3ea643)
- [Build A Full Stack Web Application Setup](https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708)
- [Create Todoist clone with React and Firebase](https://www.youtube.com/watch?v=hT3j87FMR6M)
- Build A Random Quote Machine
  - [Part 1](https://www.youtube.com/watch?v=3QngsWA9IEE)
  - [Part 2](https://www.youtube.com/watch?v=XnoTmO06OYo)
  - [Part 3](https://www.youtube.com/watch?v=us51Jne67_I)
  - [Part 4](https://www.youtube.com/watch?v=iZx7hqHb5MU)
  - [Part 5](https://www.youtube.com/watch?v=lpba9vBqXl0)
  - [Part 6](https://www.youtube.com/watch?v=Jvp8j6zrFHE)
  - [Part 7](https://www.youtube.com/watch?v=M_hFfrN8_PQ)
- [React Phone E-Commerce Project(video)](https://www.youtube.com/watch?v=-edmQKcOW8s)

### `Vue`/Angular 

- [Vue 2 + Firebase: How to build a Vue app with Firebase authentication system in 15 minutes](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)
- [Vue.js Application Tutorial – Creating a Simple Budgeting App with Vue](https://matthiashager.com/complete-vuejs-application-tutorial/)
- [Build a Blog with Vue, GraphQL and Apollo](https://scotch.io/tutorials/build-a-blog-with-vue-graphql-and-apollo-client)
- Build a full stack web application using MEVN (MongoDB, Express, Vue, Node) stack
  - [Part 1](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0)
  - [Part 2](https://medium.com/@anaida07/mevn-stack-application-part-2-2-9ebcf8a22753)
- [Vue.js To-Do List Tutorial (video)](https://www.youtube.com/watch?v=78tNYZUS-ps)
- [Vue 2 + Pub/Sub: Build a peer to peer multi-user platform for games](https://www.ably.io/tutorials/peer-to-peer-vue)

## 2.2 多端

### 知识点

- 知道TS是什么，为什么要用TS，有TS工程化实践经验。

- 知道移动端前端常见问题，包括但不限于：`rem + 1px`方案；预加载；`jsbridge`原理等。

- 能说出大概的服务端技术，包括但不限于：docker；k8s；rpc原理；中后台架构分层；缓存处理；分布式；响应式编程等。

- 1

  后端：`Redis `缓存、数据库、`Graphql`、`SSR`、模板引擎等了解和使用

- 2

- node

  1.理解`Node`在应用程序中的作用，可以使用`Node`搭建前端运行环境、使用`Node`操作文件、操作数据库等等

  2.掌握一种`Node`开发框架，如`Express`，`Express`和`Koa`的区别

  3.熟练使用`Node`提供的`API`如`Path`、`Http`、`Child Process`等并理解其实现原理

  4.`Node`的底层运行原理、和浏览器的异同

  5.`Node`事件驱动、非阻塞机制的实现原理

- 多端开发

  1.单页面应用（SPA）的原理和优缺点，掌握一种快速开发SPA的方案

  2.理解Viewport、em、rem的原理和用法，分辨率、px、ppi、dpi、dp的区别和实际应用

  3.移动端页面适配解决方案、不同机型适配方案

  4.掌握一种JavaScript移动客户端开发技术，如React Native：可以搭建React Native开发环境，熟练进行开发，可理解React Native的运作原理，不同端适配

  5.掌握一种JavaScript PC客户端开发技术，如Electron：可搭建Electron开发环境，熟练进行开发，可理解Electron的运作原理

  6.掌握一种小程序开发框架或原生小程序开发

  7.理解多端框架的内部实现原理，至少了解一个多端框架的使用

- 后端技能
  1.了解后端的开发方式，在应用程序中的作用，至少会使用一种后端语言

  2.掌握数据最终在数据库中是如何落地存储的，能看懂表结构设计、表之间的关联，至少会使用一种数据库

- Web Components

- SPA单页应用

- Progressive Web `Apps`

- Server-side rendering

- Static Site Generators

- `Graphql`

- Mobile applications

- Desktop Applications in JavaScript

###  `Node` 

`Web Server`

- [**`Node.js`**: *Let's code a web server from scratch with `NodeJS` Streams*](https://www.codementor.io/ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji)
- [**`Node.js`**: *lets-build-express*](https://github.com/antoaravinth/lets-build-express)
- [**`Node.js`**: *Building A Simple Single Sign On(`SSO`) Server And Solution From Scratch In `Node.js`.*](https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340)

other

- [Build a real-time Markdown Editor with NodeJS](https://scotch.io/tutorials/building-a-real-time-markdown-viewer)
- [Test-Driven Development with Node, Postgres and Knex](http://mherman.org/blog/2016/04/28/test-driven-development-with-node/)
- Write a Twitter Bot in Node.js
  - [Part 1](https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078)
  - [Part 2](https://codeburst.io/build-a-simple-twitter-bot-with-node-js-part-2-do-more-2ef1e039715d)
- [Build A Simple Search Bot in 30 minutes](https://medium.freecodecamp.org/how-to-build-a-simple-search-bot-in-30-minutes-eb56fcedcdb1)
- [Build A Job Scraping Web App](https://medium.freecodecamp.org/how-i-built-a-job-scraping-web-app-using-node-js-and-indreed-7fbba124bbdc)
- [Building a GitHub App](https://blog.scottlogic.com/2017/05/22/gifbot-github-integration.html)
- How to build your own Uber-for-X App using JavaScript, Node.JS, MongoDB and Web Sockets
  - [Part 1](https://www.ashwinhariharan.tech/blog/how-to-build-your-own-uber-for-x-app/)
  - [Part 2](https://www.ashwinhariharan.tech/blog/how-to-build-your-own-uber-for-x-app-part-2/)

## 2.3 工程化

### 知识点

- 熟悉常用工程化工具，掌握模块化思想和技术实现方案。

  - 知道[`webpack`](https://www.zhihu.com/search?q=webpack&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2671717786})，`rollup`以及他们适用的场景。
  - 知道[`webpack v4`](https://www.zhihu.com/search?q=webpack v4&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2671717786})和`v3`的区别。
  - 脱口而出`webpack`基础配置。
  - 知道`webpack`打包结果的代码结构和执行流程，知道`index.js`，`runtime.js`是干嘛的。
  - 知道`amd`，`cmd`，[`commonjs`](https://www.zhihu.com/search?q=commonjs&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2671717786})，es module分别是什么。
  - 知道所有模块化标准定义一个模块怎么写。给出2个文件，能口喷一段代码完成模块打包和执行的核心逻辑。
  - 知道`eslint`，以及如何与工程配合使用。

- 1

  工程：编译工具、格式工具、Git、`NPM`、单元测试、`Nginx`、`PM2`、CI / CD 了解和使用

- 业务思考
  - 工程化：代码部署、CI / CD 流程设计、Jenkins、Gitlab、Docker 等
  - 通用性：脚手架、SDK、组件库等框架设计
  - 应用框架：Hybrid 混合、微前端、BFF、Monorepo
  - 可视化：
  - 低代码：通用表单设计、通用布局设计、通用页面设计、`JSON` Schema 协议设计等
  - 测试：`E2E` 测试、单元测试、测试覆盖率、测试报告等
  - 业务：数据、体验、复杂度、监控

- 2

- 实用库

  1.至少掌握一种`UI`组件框架，如`antd` design，理解其设计理念、底层实现

  2.掌握一种图表绘制框架，如`Echart`，理解其设计理念、底层实现，可以自己实现图表

  3.掌握一种GIS开发框架，如百度地图API

  4.掌握一种可视化开发框架，如`Three.js`、`D3`

  5.工具函数库，如lodash、underscore、moment等，理解使用的工具类或工具函数的具体实现原理

- 开发和调试

  1.熟练使用各浏览器提供的调试工具

  2.熟练使用一种代理工具实现请求代理、抓包，如charls

  3.可以使用Android、IOS模拟器进行调试，并掌握一种真机调试方案

  4.了解Vue、React等框架调试工具的使用

- 项目构建

  1.理解npm、yarn依赖包管理的原理，两者的区别

  2.可以使用npm运行自定义脚本

  3.理解Babel、ESLint、webpack等工具在项目中承担的作用

  4.`ESLint`规则检测原理，常用的`ESLint`配置

  5.`Babel`的核心原理，可以自己编写一个Babel插件

  6.可以配置一种前端代码兼容方案，如Polyfill

  7.Webpack的编译原理、构建流程、热更新原理，chunk、bundle和module的区别和应用

  8.可熟练配置已有的loaders和plugins解决问题，可以自己编写loaders和plugins

- nginx

  1.正向代理与反向代理的特点和实例

  2.可手动搭建一个简单的nginx服务器、

  3.熟练应用常用的nginx内置变量，掌握常用的匹配规则写法

  4.可以用nginx实现请求过滤、配置gzip、负载均衡等，并能解释其内部原理

- 开发提速

  1.熟练掌握一种接口管理、接口mock工具的使用，如yapi

  2.掌握一种高效的日志埋点方案，可快速使用日志查询工具定位线上问题

  3.理解TDD与BDD模式，至少会使用一种前端单元测试框架

- 版本控制

  1.理解Git的核心原理、工作流程、和SVN的区别

  2.熟练使用常规的Git命令、git rebase、git stash等进阶命令

  3.可以快速解决线上分支回滚、线上分支错误合并等复杂问题

- 持续集成

  1.理解CI/CD技术的意义，至少熟练掌握一种CI/CD工具的使用，如Jenkins

  2.可以独自完成架构设计、技术选型、环境搭建、全流程开发、部署上线等一套完整的开发流程（包括Web应用、移动客户端应用、PC客户端应用、小程序、H5等等）

[带你入门前端工程](https://woai3c.github.io/introduction-to-front-end-engineering/)

[系统设计入门](https://github.com/xitu/system-design-primer/blob/translation/README-zh-Hans.md)

- 测试
  - [JUnit User Guide](https://junit.org/junit5/docs/current/user-guide/)
  - [You Still Don’t Know How to Do Unit Testing](https://stackify.com/unit-testing-basics-best-practices/)
  - [Unit Testing Best Practices: JUnit Reference Guide](https://dzone.com/articles/unit-testing-best-practices)
  - [JUnit Best Practices](http://www.kyleblaney.com/junit-best-practices/)
- 添加埋点：曝光上报、点击上报、呼吸上报
- 监控上报、测试上报、`badjs`上报
- 容灾演习
- Code Review 
  - [Code Review Best Practices](https://blog.palantir.com/code-review-best-practices-19e02780015f?gi=cfb2fccae145)
  - [How Google Does Code Review](https://dzone.com/articles/how-google-does-code-review)
  - [LinkedIn’s Tips for Highly Effective Code Review](https://thenewstack.io/linkedin-code-review/)

## 2.4 性能

### 知识点

- 1

- 性能：编译性能、监控、白屏检测、SEO、Service Worker 等了解

- 2

- 1.了解前端性能衡量指标、性能监控要点，掌握一种前端性能监控方案

  2.了解常见的Web、App性能优化方案

  3.`SEO`排名规则、`SEO`优化方案、前后端分离的`SEO`

  4.`SSR`实现方案、优缺点、及其性能优化

  5.`Webpack`的性能优化方案

  6.`Canvas`性能优化方案

  7.`React`、`Vue`等框架使用性能优化方案

- 3

  性能分析工具

  - 控制台的瀑布图 Waterfall
  - 控制台的 performance工具：日常开发过程中观察分析运行时的性能表现
  - 控制台的 LightHouse ：跑分、输出性能报告，分析性能
  - [WebPageTest](https://www.webpagetest.org/)网站：评估网站性能
  - Performance 这个API：实时动态测量性能

  性能参数

  - 首屏时间 = 白屏时间 + 渲染时间。预解析、预加载、预渲染、懒加载、懒执行。
  - FPS帧率
  - 性能的测量标准：RAIL 模型
  - 弱网环境，耗时对比

  浏览器渲染优化

  - 了解渲染过程、关键渲染路径
  - 减少重排和重绘
  - 用户从输入url到页面加载显示完成，经历了哪些过程

  JavaScript 优化

  - JS资源优化：按需加载、编译打包、解析执行、异步加载
  - V8引擎工作原理、性能优化原理
  - 防抖和节流
  - 无限滚动列表：做节点回收
  - 骨架屏 skeleton：减少布局移动
  - 时间分片：把一个运行时间比较长的任务分解成一块一块比较小的任务，分块去执行，减少用户的卡顿感
  - JS内存管理

  资源优化

  - 资源的压缩与合并：减少http请求数量；减少请求资源的大小；使用 http缓存
  - HTML优化：减少iframe的使用；避免节点的深层次嵌套；避免使用table布局
  - CSS优化：降低CSS对页面渲染的阻塞，尽早加载CSS；利用GPU渲染CSS动画；使用 contain属性，减少布局和绘制的消耗时间
  - 图片优化：使用CSS3、SVG、IconFont代替图像；图片懒加载 lazy loading；图片的预加载；渐进式图片；响应式图片；使用 base64 代替小于8kb的图。
  - 字体优化：字体闪动问题；使用特殊字体时，建议动态加载网络字体
  - 异步加载第三方资源：第三方资源不可控会影响页面的加载和显示

  构建优化

  - tree shaking、代码拆分（Code Splitting）
  - 代码压缩混淆
  - 打包时，避免对不变的库重复构建。

  网络传输优化

  - 启用Gzip对资源进行压缩
  - CDN传输：静态资源全部放CDN上，使用户可就近获取所需内容，大幅减小光纤传输距离。
  - 避免重定向：301、302 重定向会降低响应速度
  - dns预解析：使用dns-prefetch 提前解析域名，提高资源加载速度。在访问以图片为主的网站时，DNS预解析可以让加载时间减少5%左右。
  - PWA，Service worker
  - SSR 服务端渲染/Node直出

## 2.5 业务


- 2


  - 1.能理解所开发项目的整体业务形态、业务目标、业务架构，可以快速定位线上业务问题
  - 2.能理解所开发项目整体的技术架构、能快读的根据新需求进行开发规划、能快速根据业务报警、线上日志等定位并解决线上技术问题
  - 3.可以将自己的想法或新技术在业务中落地实践，尽量在团队中拥有一定的不可替代性

- 开户重构 2021.12--2022.3

  存单 2022.--2022.10

  表单（设置）

  发文件上传 

  表格/弹窗拖动 

  网点数

  审批（付款）

  冻结

  预填单 2022.11--2022.12


------

**微服务**。有了分布式架构理论和工程的基础，接下来是对微服务的学习。在这部分内容中，我会罗列几个介绍微服务架构非常系统的文章，然后比较一下微服务和 `SOA` 的差别，最后则是一些工程实践和最佳实践。

**容器化和自动化运维**。在容器化和自动化运维中，主要是学习 Docker 和 `Kubernetes` 这两个自动化运维的杀手型技术。而不是 Salt、Puppet、Chef 和 `Ansible` 这样比较传统的工具。原因很简单，因为自动化部署根本不够，还需要对环境和运行时的管理和运维才

够，而只有 Docker 和 `Kubernetes` 才是未来。所以，这里重点让你学习这两个技术，其中有很多文章需要一些系统底层的知识。

**前端开发**。这里的前端主要是 HTML 5 的前端了，这一节会带你学习一下前端开发所需要知道的基础知识，尤其是对前端开发语言 JavaScript 的学习，我花费了相当的篇幅列出了很多很经典的学习资料，必定会让你成为一个 JavaScript 高手。然后你还需要了解浏览器是怎样工作的，还有相关的网络协议和一些性能优化的技巧。最后则是JavaScript 框架的学习，这里我只给了 `React.js` 和 `Vue.js`，并通过 `React.js` 带出来**函数式编程**的学习。



**JavaScript 的核心原理**。这里我会给出好些网上很不错的讲 JavaScript 的原理的文章或图书，你一定要学好语言的特性，并且详细了解其中的各种坑。

**浏览器的工作原理**。这也是一块硬骨头，我觉得这是前端程序员需要了解和明白的关键知识点，不然，你将无法深入下去。

**网络协议 HTTP**。也是要着重了解的，尤其是 HTTP/2，还有 HTTP 的几种请求方式：短连接、长连接、Stream 连接、WebSocket 连接。

**前端性能调优**。有了以上的这些基础后，你就可以进入前端性能调优的主题了，我相信你可以很容易上手各种性能调优技术的。

**框架学习**。我只给了 React 和 Vue 两个框架。就这两个框架来说，Virtual DOM 技术是其底层技术，组件化是其思想，管理组件的状态是其重点。而对于 React 来说，函数式编程又是其编程思想，所以，这些基础技术都是你需要好好研究和学习的。

**UI 设计**。设计也是前端需要做的一个事，比如像 Google 的 Material UI，或是比较流行的 Atomic Design 等应该是前端工程师需要学习的。



