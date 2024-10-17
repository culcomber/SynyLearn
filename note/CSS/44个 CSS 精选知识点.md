44个 CSS 精选知识点
1、不变宽高比
```css
<div class="constant-width-to-height-ratio"></div>

.constant-width-to-height-ratio {
  background: #333;
  width: 50%;
}
.constant-width-to-height-ratio::before {
  content: '';
  padding-top: 100%;
  float: left;
}
.constant-width-to-height-ratio::after {
  content: '';
  display: block;
  clear: both;
}
```

- `width:50%` 设置元素的宽度自适应父元素宽度
- `::before` 为父级元素定义一个伪元素，`padding-top: 100%;` 设置伪元素的内上边距，这里的百分比的值是按照宽度计算的，所以高度随着宽度变化，由于没有宽度不会影响布局
- 如果设置`::before`高度会影响 `div` 高度计算，相当于加上一个常量，`divHeight = beforeHeight + padding-top`
- `::after` 防止父元素高度塌陷

2、让图片在容器中显示的更舒适
`object-fit: contain` 容器内显示整个图像，并且保持宽高比
`object-fit: cover` 用图像填充容器，并保持宽高比
`object-position: [x] [y]` 对图像的显示部位进行调整

3、使用 `flexbox` 居中

```css
<div class="flexbox-centering"><div class="child">Centered content.</div></div>
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* 必须设置高度，不然高度由内部元素决定，没有多余高度让元素竖直居中 */
}
```

4、将元素垂直居中于另一个元素。
```css
<div class="ghost-trick">
  <div class="ghosting"><p>Vertically centered without changing the position property.</p></div>
</div>

.ghosting {
  height: 300px;
  background: #0ff;
}
.ghosting:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle; /* 实现要点，让行内元素文本排布居中 */
}
p {
  display: inline-block; /* 实现要点，让p元素变成行内元素， vertical-align: middle 才能起作用 */
  vertical-align: middle;
}
```

- 如果 `p` 元素去除 `display: inline-block;`，由于父元素是定高，高度被 `before` 占用，`p` 元素会溢出，和后面的元素发生重叠，因为`overflow:visible`	默认值，内容不会被修剪，会呈现在元素框之外。

5、使最后一项占满剩余高度
通过为最后一个元素提供当前视口中剩余的可用空间，即使在调整窗口大小时，也可以利用可用的视口空间。
```css
<div class="container">
  <div>Div 1</div>
  <div>Div 2</div>
  <div>Div 3</div>
</div>

body {
  height: 100%;
  margin: 0;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container > div:last-child {
  background-color: tomato;
  flex: 1;
}
```
- `height: 100%`  将容器的高度设为视口的高度，
- `flex-direction: column` 将项目的顺序设置成从上到下
- 父级必须具有视口高度，`flex-grow: 1` 将容器的剩余可用空间应用于最后一个子元素，利用剩余空间。

6、居中子元素
使用 `transform: translate()` 进行居中，不需要知道子元素的宽高。
```css
<div class="parent"><div class="child">Centered content</div></div>

.parent {
  border: 1px solid #333;
  height: 250px;
  position: relative;
  width: 250px;
}

.child {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
```
如果知道子元素宽高可以使用 margin 居中
```css
<div class="parent"><div class="child">Centered content</div></div>

.child {
  position: absolute;
  left: 0;right: 0;top: 0; bottom: 0;
  width: 300px; height: 200px;
  margin: auto;
}
```

7、多行文本截断显示

```css
<p class="truncate-text-multiline">
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et.
</p>

.truncate-text-multiline {
  overflow: hidden;
  display: block;
  height: 109.2px;
  margin: 0 auto;
  font-size: 26px;
  line-height: 1.4;
  width: 400px;
  position: relative;
}
.truncate-text-multiline:after {
  content: '';
  position: absolute; /* 元素会块状化 */
  bottom: 0;
  right: 0;
  width: 150px;
  height: 36.4px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%);
}
```

`:before` `after` 默认是行内元素，相当于在原本子元素的前面和后面添加元素

`position: absolute;` 相对 `relative` 父元素定位，没有 `relative` 父元素就像对于自己定位
`right: 10px;` 相对于定位元素右边往左移动 `10px`
`right: -10px;` 相对于定位元素右边往右移动 `10px`
`bottom/top` 互斥 `top` 起作用，`left/right` 互斥 `left` 起作用
`bottom/top/left/right` 都设置，元素就变成竖直和水平都有流动性


7、画一个圆
```css
<div class="circle"></div>
 .circle {
  border-radius: 50%; 
  width: 2rem;
  height: 2rem;
  background: #333;
}
```

8、 列表计数器
```css
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>

ul {
  counter-reset: counter;
}
li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```

- `counter-reset` 初始化计数器，该值是计数器的名称。默认情况下，计数器从0开始。此属性还可用于将其值更改为任何特定数字。
- `counter-increment` 用于可数的元素。 一旦计数器重置初始化，计数器的值可以增加或减少。
- `counter(name, style)` 显示节计数器的值。通常用于内容属性。此函数可以接收两个参数，第一个作为计数器的名称，第二个参数表示占位内容，例如3.1的小数点。

9、自定义文本选择的样式

```css
<p class="custom-text-selection">Select some of this text.</p>

::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```
使用 `::scrollbar` 改变滚动条样式


10、计算函数 `Calc()`
允许使用数学表达式定义 `CSS` 值，属性采用的值是数学表达式的结果。
```css
<div class="box-example"></div>

.box-example {
  height: 280px;
  background: #222 url('https://image.ibb.co/fUL9nS/wolf.png') no-repeat;
  background-position: calc(100% - 20px) calc(100% - 20px);
}
```

- 允许加法，减法，乘法和除法。
-  可以为表达式中的每个值使用不同的单位（例如，像素和百分比）。  
- 允许嵌套calc（）函数。