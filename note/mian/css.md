HTML
1、HTML5特性
==todo== 做给小项目
- 本地存储 localStorage 和 sessionStorage
- 浏览器通知 Notifications
- 地理位置 Geolocation
- 离线应⽤ manifest
- 全双⼯通信协议 websocket
- 浏览器历史对象 history
- 多任务处理 webworker
- 窗口之间相互通信 postMessage 
标签相关
- 语义化标签，例如 header，nav，footer，section，article 等标签。
- 拖拽相关API
- 增强表单控件 url，date，time，email，calendar，search
- ⻚⾯可⻅性改变事件 visibilitychange
- 跨窗⼝通信 PostMessage
- 表单 FormData 对象
- canvas+SVG

2、语义化标签
==todo== https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
`<strong>` 元素表示具有某种重要性的文本，`<em>` 元素强调文本，而 `<mark>` 元素表示具有某种关联性的文本。`<b>` 元素不会传达这种特殊的语义信息；仅在其他元素都不适用时使用它。

**优点**
- 增加代码可读性，结构清晰，便于开发和维护
- ⽂字表现⼒丰富，有利于SEO。
- ⽅便设备解析（如盲⼈阅读器等），可⽤于智能分析
- 在没有 CSS 样式下，⻚⾯也能呈现出很好地内容结构、代码结构

3、src 和 href 的区别
src ⽤于替换当前元素，href ⽤于在当前⽂档和引⽤资源之间确⽴联系
⼀、src
src 是 source 的缩写，指向外部资源的位置，指向的内容将会嵌⼊到⽂档中当前标签所在位置；在请求 src 资源时
会将其指向的资源下载并应⽤到⽂档内，例如 **js 脚本，img 图⽚和 frame 等元素**。
当浏览器解析到该元素时，浏览器会对这个⽂件进⾏解析，编译和执⾏，从⽽导致整个⻚⾯加载会被**暂停**，类似于
将所指向资源嵌⼊当前标签内。这也是为什么将js 脚本放在底部⽽不是头部。
⼆、href
href 是 Hypertext Reference 的缩写，指向⽹络资源所在位置，建⽴和当前元素（锚点）或当前⽂档（链接）之间
的链接，浏览器遇到 href 就会**并⾏下载**资源并且不会停⽌对当前⽂档的处理。 

4、iframe
如果不是同源的，我们就不能访问窗口中的内容：变量，文档，任何东西。唯一例外是location：我们可以修改它，使用它进行重定向。但是我们无法读取 location 。因此，我们无法看到用户当前所处的位置，也就不会泄露任何信息。
文档在 iframe.onload 触发时肯定就位了。但是，只有在整个 iframe 和它所有资源都加载完成时，iframe.onload 才会触发。
iframe 嵌套的 2.html 设置的 cookie 我们可以从 1.html 中获取
iframe 中设置的 cookie 会覆盖 1.html cookie 中 Name 相同的值( 不同源也是同样的效果 )
```html
 <!-- 1.html 内容 -->
 <!-- http://127.0.0.1:8000/1.html -->
 <body>
     我是 1.html, 下面嵌套 2.html
     <iframe src="http://127.0.0.1:8000/2.html" ></iframe>
     <script>
         function hello () { console.log('this is 1.html') }
         var iframe = document.getElementsByTagName('iframe')[0];
         console.log('contentWindow 🥝', iframe.contentWindow); // 能访问
         console.log('contentDocument 🥝', iframe.contentDocument); // 能访问
         // 注意访问方式, 需要在 onload 后才能取到值
         console.log( iframe.contentWindow.hello() ) // Uncaught TypeError: iframe.contentWindow.hello is not a function
         iframe.onload = function(){
             console.log( iframe.contentWindow.hello() ) // this is 2.html
             //  输出 Location 对象， 依然要在 iframe.onload 中访问
             console.log('contentWindow.location 🥝', iframe.contentWindow.location)
             // 有相同的源 我们可以进行任何操作
             iframe.contentDocument.body.innerHTML('<p>hi, i am ur father !</p>');
             iframe.contentDocument.getElementsByTagName('p');
         })
         iframe.contentWindow.location = 'http://www.360doc.com'; // 可以直接修改 iframe 地址, 不受同源策略的限制。 有的网站不支持被iframe引用, 所以会报错。 注意区分错误信息。
     </script>
 </body>

 <!-- 2.html 内容 -->
 <!-- http://127.0.0.1:8000/2.html -->
 <body>
     我是 2.html
     <script>
         function hello () { console.log('this is 2.html') }
     </script>
 </body>
```

5、defer 和 async
defer和async是script标签的两个属性，⽤于在不阻塞⻚⾯⽂档解析的前提线下，控制脚本的下载和执⾏。
先了解⼀下⻚⾯的加载和渲染过程：
1. 浏览器发送请求，获取HTML⽂档开始从上到下解析并构建DOM
2. 构建DOM过程中，若遇到外联样式声明和脚本声明，会暂停⽂档解析，并开始下载样式脚本和⽂件
3. 样式⽂件下载完成后，构建CSSDOM；脚本⽂件下载完成后，解析并执⾏，再继续解析⽂档构建DOM
4. ⽂档解析完成后，将DOM和CSSDOM进⾏关联和映射，最后将视图渲染到浏览器窗⼝

defer：⽤于开启新的线程下载脚本⽂件，并使脚本在**⽂档解析完成后执⾏**。
async：HTML5新增属性，⽤于异步下载脚本⽂件，**下载完毕⽴即解释执⾏代码**。

CSS
1、link和@import的区别浅析

 - @import是 CSS 提供的语法规则，只有导⼊样式表的作⽤ 
 - link是HTML提供的标签，不仅可以加载 CSS ⽂件，还可以定义RSS、rel 连接属性等
 - link引入的样式和@import引入的样式权重没有区别，后引入都会覆盖前引入的

```
// 并行下载
<style>
@import url('a.css');
@import url('b.css');
</style>

// a下载完再下载b
// 在 HTML 文档中：
<link rel='stylesheet' type='text/css' href='a.css'>in a.css: 
// 在.css中：
@import url('b.css');
```

2、伪元素和伪类
==todo== https://juejin.cn/post/6976646049456717838?searchId=202404291609086F9A8CDC43586503C9AA
 - 伪类表示被选择元素的某种状态，例如:hover
 - 伪元素表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是是"假元素"，只存在于css中，所以叫"伪"的元素，例如:before和:after

3、CSS 单位
==todo== https://juejin.cn/post/7036900903462371336?searchId=20240429161308568A87AA3CA1C504AAE4
1.绝对单位
 - px - 像素 
 - pt - 点 
 - pc - Picas 
 - in - 英寸 
 - cm - 厘米 
 - mm - 毫米

2.百分比单位
 - 百分比 % 单位

3.相对单位
相对于字体大小
 - em 
 - rem - 根 em

相对于查看端口/文档
 - vw 
 - vh 
 - vmax 
 - vmin

使用场景
-  px单位常用于边框。无论您选择什么屏幕尺寸，px 单位的尺寸都是固定的。
-  % 单位相对于相对父级的宽度。如果没有定义的父级，则默认情况下body被视为父级。
-  em 单位相对于元素字体大小的边距和填充 。如果未覆盖，默认字体大小为 16px。
-  rem 单位相对于根的字体大小 。
-  vw 代表 viewprot width（视口宽度），vh 代表 viewprot height （视口高度），vw 和 vh 表示相对于根的宽度和高度。
-  这些是 6 个 css 单元，它们最常用于使网站具有响应性。

4、选择器
```css
/* selectorAselectorB */
/* 类名为 app 的 <div> 元素 */
div.app {
    /*  */
}

/* selectorA, selectorB */
/* 同时设置 <div> 元素和 <p> 元素的字体大小 */
div, p {
    font-size: 16px;
}

/* 将所有元素的 padding 和 margin 都设置为 0 */
* {
    padding: 0;
    margin: 0;
}

/* 将含有 data-title 属性的元素的字体颜色设置为红色 */
[data-title] {
    color: red;
}

/* ---------组合选择器--------- */
/* 后代选择器(selectorA selectorB) */
/* 选择 <ol> 元素内部所有的 <li> 元素 */
ol li {
    color: red;
}

/* 子元素选择器(selectorA > selectorB) */
/* 选择直系父元素为 <div> 元素的 <p> 元素  */
div > p {
    color: red;
}

/* 相邻兄弟选择器(selectorA + selectorB) */
/* 选择上一个选择器为 <div> 元素的 <p> 元素 */
div + p {
    color: red;
}

/* selectorA ~ selectorB */
/* 将 <div> 元素后面的所有 <p> 元素的字体颜色设置为红色 */
div ~ p {
    color: red;
}

 优先级排序如下：important 》内联样式 》id选择器 》类名选择器 = 伪类选择器 = 属性选择器 》元素选择器 = 伪元素选择器 》通配符选择器。
 选择器优先级是没有进位的，也就是说即使 100 个 class 选择器，其优先级也没有 1 个 id 选择器高。
```
5、重排重绘合成
**执行顺序**
重排 reflow --> 重绘 repaint --> 合成 

**触发操作**
重排 
 - 窗⼝⼤⼩改变(resize事件) 
 - 元素属性、尺⼨、位置、内容、盒模型改变 
 - 元素字体⼤⼩变化 
 - 窗口滚动
 - 在文本框输入文字
 - 添加或者删除dom 元素和样式表
 - 激活 CSS伪类(如 :hover) 
 - 查询某些属性或调⽤某些⽅法，如 clientWidth、clientTop、focus 等
重绘：背景、边框颜色
合成：transform、translate、opacity、filter、will-change

**优化**
- 使⽤ visibility: hidden 替换 display: none ，因为前者只会引起重绘，后者会引发重排
- 合并css操作，比起给两个元素分别修改style，可以给节点统一增加一个选择器
- 使⽤ absolute或 fixed使元素脱离⽂档流
```js
element.style.left = '8px'
element.style.right = '8px'

element.classList.add = ' modifier'
element.style.cssText = '; left:'+ left + 'px; right:' + right + 'px;'
```

6、有继承性的属性
字体系列属性
font-family：字体系列
font-weight：字体的粗细
font-size：字体的大小
font-style：字体的风格


文本系列属性
text-indent：文本缩进
text-align：文本水平对齐
line-height：行高
word-spacing：单词之间的间距
letter-spacing：中文或者字母之间的间距
text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
color：文本颜色


元素可见性
visibility：控制元素显示隐藏

列表布局属性
list-style：列表风格，包括list-style-type、list-style-image等

光标属性
cursor：光标显示为何种形态

7、隐藏元素的方法有哪些
- display: none：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- visibility: hidden：元素在页面中**仍占据空间**，但是不会响应绑定的监听事件。
- opacity: 0：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- position: absolute：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- z-index: 负值：来使其他元素遮盖住该元素，以此来实现隐藏。
- clip/clip-path ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中**占据位置**，但是不会响应绑定的监听事件。
- transform: scale(0,0)：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中**占据位置**，但是不会响应绑定的监听事件。

8、li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？
**浏览器会把inline内联元素间的空白字符（空格、换行、Tab等）渲染成一个空格**。为了美观，通常是一个<li>放在一行，这导致<li>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。
解决办法：
（1）为<li>设置float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。
（2）将所有<li>写在同一行。不足：代码不美观。
（3）将<ul>内的字符尺寸直接设为0，即font-size:0。不足：<ul>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。
（4）消除<ul>的字符间隔letter-spacing:-8px，不足：这也设置了<li>内的字符间隔，因此需要将<li>内的字符间隔设为默认letter-spacing:normal。

9、替换元素的概念及计算规则
通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。
特性：
- 内容的外观不受页面上的CSS的影响：用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观需要类似appearance属性，或者浏览器自身暴露的一些样式接口。
- 有自己的尺寸：在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素。
- 在很多CSS属性上有自己的一套表现规则：比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。
- 所有的替换元素都是内联水平元素。

10、什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？
以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 DIV元素宽度为 414px，这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。

可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片:
```css
my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```

11、CSS预处理器/后处理器是什么？为什么要使用它们？
预处理器， 如：less，sass，stylus，用来预编译sass或者less，增加了css代码的复用性。层级，mixin， 变量，循环， 函数等对编写以及开发UI组件都极为方便。

后处理器， 如： postCss，通常是在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

12、单行、多行文本溢出隐藏
单行文本溢出
```css
css复制代码overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```

多行文本溢出
```css
css复制代码overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```











CSS基础
流、元素与基本尺寸
inline元素设置width，height无效，**水平方向的padding、margin产生边距效果**，竖直方向的padding、margin不会产生边距效果。
长宽 width height 100% auto 

盒尺寸
content padding magin border 

内联元素与流
line-height vertical-align

流的破坏与保护
flex fload position overflow
BFC IFC FC

层叠

文本 
font-size 
text-indent 与内联元素缩进
letter-spacing 与字符间距
word-spacing 与单词间距
word-break 和 word-wrap 的区别
white-space 与换行和空格的控制
text-align 与元素对齐
text-decoration 下划线和文本重叠的问题
text-transform 字符大小写

动画

CSS 优化和提高性能