1、CSS数据类型

常见数据类型
`<shape-box>` ：
- `<box>`；
	- `content-box`；
	- `padding-box`；
	- `border-box`。
- `margin-box`。

`<basic-shape>` ：
- `inset()`；
- `circle(`)；
- `ellipse()`；
- `polygon()`；
- `path()`。

`<image>` ：
- `<url>`；
- `<gradient>`；
- `element()`；
- `image()`；
- `image-set()`；
- `cross-fade()`；
- `paint()`。

`<color>` ：
- `<rgb()>`；
- `<rgba()>`；
- `<hsl()>`；
- `<hsla()>`；
- `<hex-color>`；
- `<named-color>`；
- `currentColor`；
- `<deprecated-system-color>`。

CSS属性值定义语法
`linear-gradient( [ <angle> | to <side-or-corner> ,]? <color-stop-list> )`
- `<angle>`、`<side-or-corner>` 和 `<color-stop-list>` 是**数据类型**；
- `to` 是**关键字**；
	通用关键字
	- `auto`
	- `none`
	- `ease`
	全局关键字
	- `inherit` 继承
	- `initial` 初始值
	- `unset`：如果当前使用的 `CSS` 属性是具有继承特性的，如 `color` 属性，则等同于使用 `inherit` 关键字；如果当前使用的 `CSS` 属性是没有继承特性的，如 `background-color`，则等同于使用 `initial` 关键字。使用 `all:unset` 进行批量重置。
	- `revert`：让当前元素的样式还原成浏览器内置的样式
	- `all`：指代所有 `CSS` 属性
- `[]` `?` `,` 是**符号**。
	（1）字面符号：按照其原本的字面意义呈现
	- 逗号（,）：用来分隔数个并列值，或者分隔函数的参数值
	- 斜杠（/）：用来分隔一个值的多个部分
	（2）组合符号：用来表示数个基本元素之间的组合关系
	- 空格字符：表示各部分必须出现，同时需要按顺序出现
	- “与”组合符（`&&`）： 各部分必须出现，但可以不按顺序出现
	- “或”组合符（`||`）： 各部分至少出现一个，可以不按顺序出现
	- “互斥”组合符（`|`）： 各部分恰好出现其中一个
	- 方括号（`[]`）： 将各部分进行分组以绕过上面几个符号的优先规则，因此方括号的优先级最高
	（3）数量符号：描述一个元素可以出现多少次，数量符号不能叠加出现，并且优先级高于组合符号
	- 无数量符号 恰好出现一次
	- `*` 星号 可以出现任意次数
	- `+` 加号 可以出现一次或多次
	- `?` 问号 可以出现零次或者一次，也就是该元素可有可无
	- `{A,B}` 花括号 出现最少A次，最多B次
	- `#` 井号 可以出现一次或多次，但多次出现时必须以逗号分隔
	- `!` 叹号 表示当前分组必须产生一个值，该符号多出现在组合符号方括号的后面

全新的布局方式
1、分栏布局
分栏布局最大的优点是不会改变元素原本的display计算值。
```css
<div>
    <p>重庆市</p>
    <p>哈尔滨市</p>
    <p>长春市</p>
    <p>兰州市</p>
    <p>北京市</p>
</div>

div {
  columns: 2;
}
```

分栏布局实现两端对齐布局
```css
<div class="container">
	<div class="list"></div>
	<div class="list"></div>
	<div class="list"></div>
</div>

.container {
width: 300px;
border: solid deepskyblue;
column-count: 3;
column-gap: 5%;
}
.list {
height: 100px;
background-color: deeppink;
}
```

break-inside属性与元素断点位置的控制
break-inside属性可以定义页面打印、分栏布局或Regions布局（已废弃）发生中断时元素的表现形式。如果没有发生中断，则忽略该属性。
 - auto表示元素可以中断。
 - avoid表示元素不能中断。

box-decoration-break属性与元素断点装饰的控制
如果希望因为分栏断开的文字在每一栏中都拥有独立完整的边框，则可以使用box-decorationbreak属性实现。
 - slice为默认值，表示各个元素断开的部分如同被切开一般。 
 - clone表示断开的各个元素的样式独自渲染。

2、弹性布局
弹性布局相关属性分为4个大的类目
 - 流向控制
 - 对齐设置
 - 顺序控制
 - 弹性设置

display:inline-flex声明可以让flex容器保持内联特性，也就是可以让图片和文字在一行显示，其他特性表现则和display:flex声明一模一样。
```css
<div class="container">
	<content>1</content>
	<content>2</content>
	<content>3</content>
</div>

.container {
	display: flex;
}
```

2.1 设置display:flex/display:inline-flex声明发生了什么
1．flex子项块状化
在flex子项元素中使用vertial-align属性一定是没有任何效果的。
flex子项的块状化特性对**匿名内联元素**同样适用，所谓匿名内联元素指的就是没有嵌套标签的裸露的文本元素。
2．flex子项**浮动失效**
3．flex子项支持**z-index**属性
即使flex子项的position属性的计算值是static。如果z-index属性值不是auto，则会创建新的层叠上下文。
4．flex子项的margin值不会合并
5．flex子项是**格式化的尺寸**
可以使用margin:auto进行剩余空间的智能分配
```css
/* 第二个<content>元素居中显示 */
content:nth-of-type(2) {
	margin: auto;
}

/* 最后一个<content>元素右对齐 */
content:last-child {
	margin-left: auto;
}
```
6．其他
flex子项如果被设置为**绝对定位**，则会脱离弹性布局。
flex子项的尺寸默认表现为收缩，如果要设置建议的尺寸，可以给flex子项使用flex-basis属性，或者使用缩写的flex属性。
flex子项的宽度之和超过flex容器，flex子项也**不会换行**，这个特性表现是由flex-wrap属性决定的。

2.2 flex-direction属性与整体布局方向
控制flex子项整体布局方向，决定是从左往右排列还是从右往左排列，是从上往下排列还是从下往上排列。
`flex-direction: row | row-reverse | column | column-reverse;`
 1. row是默认值，表示flex子项显示为水平排列。
 2. row-reverse表示flex子项显示为水平排列，但方向和row属性值相反。
 3. column表示flex子项显示为垂直排列。
 4. column-reverse表示flex子项显示为垂直排列，但方向和column属性值相反。

2.3 flex-wrap属性与整体布局的换行表现
控制flex子项是单行显示还是换行显示，以及在换行情况下，每一行内容是否在垂直方向的反方向显示。
`flex-wrap: nowrap | wrap | wrap-reverse;`
 1. nowrap是默认值，表示flex子项是单行显示，且不换行。
 2. wrap表示flex容器宽度不足的时候，flex子项会换行显示。
 3. wrap-reverse表示宽度不足的时候，flex子项会换行显示，但是flex子项是从下往上开始排列的，也就是原本换行到下面一行的flex子项现在换行到上面一行。

2.4 熟练使用flex-flow属性
flex-flow属性是flex-direction属性和flex-wrap属性的缩写，表示弹性布局的流动特性。
`flex-flow: <'flex-direction'> || <'flex-wrap'>`
当多属性值同时使用的时候，使用空格分隔，且不区分前后顺序。
没有必要使用flex-direction属性和flex-wrap属性，直接使用flex-flow这个缩写属性就好了。

2.5 CSS全新的对齐特性综述
 - justify表示**水平**方向的样式设置； 
 - align表示**垂直**方向的样式设置；
 - items表示**全体元素**的样式设置；
 - content表示**整体布局**的样式设置； 
 - self表示**元素自身**的样式设置，其一定是应用在子元素上的。

2.6 justify-content属性与整体布局的水平对齐
`justify-content: normal | flex-start | flex-end | center | space-between | space-around | space-evenly;`
 - flex-start默认值，与文档流方向相关，默认表现为整体布局左对齐。
 - flex-end与文档流方向相关，默认表现为整体布局右对齐。如果flex容器设置了overflow滚动滚动效果会失效。
 - center表现为整体布局居中对齐。
 - space-between表示多余的空白间距只在元素中间区域分配，视觉上表现为两端对齐效果。
 - space-around表示每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终在视觉表现上边缘两侧的空白只有中间空白宽度的一半。
 - space-evenly表示每个flex子项两侧空白间距完全相等。

2.7 垂直对齐属性align-items与align-self
align-self属性是设置在具体的某一个flex子项上。align-items属性是设置在全部flex容器元素上
`align-items: stretch | flex-start | flex-end | center | baseline;`
`align-self: auto | stretch | flex-start | flex-end | center | baseline;`
 - auto表示flex子项的垂直对齐方式是由flex容器的align-items属性值决定的。
 - stretch可以看成弹性布局中align-items属性的默认值，**表示flex子项在垂直方向上拉伸**，可以让flex子项的高度拉伸到每行容器高度。如果flex子项设置了具体的高度值，则按照设置的高度值渲染，而非拉伸，也就是stretch值渲染尺寸的优先级小于height等属性。
 - flex-start与文档流方向相关，默认表现为flex子项顶部对齐。背景区域不再是拉伸而是适应子元素的高度。
 - flex-end与文档流方向相关，默认表现为flex子项底部对齐。
 - center表示flex子项都是垂直居中对齐。
 - baseline表示flex子项参与基线对齐。让所有flex子项的内外基线都在一条水平线上，就是给每个flex子项里里外外写上多个字母“x”，这些字母“x”的下边缘保持对齐。

flex每一行的高度由最高的元素绝对，下一行在最高元素底部开启

2.8 align-content属性与整体布局的垂直对齐
align-items属性设置的是每一个flex子项的垂直对齐方式
align-content属性将所有flex子项作为一个整体进行垂直对齐设置

`align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;`
- stretch默认值，表示每一行flex子项都等比例拉伸。例如，如果共两行flex子项，则每一行拉伸的高度是50%。
- sflex-start与文档流方向相关，默认表现为顶部堆砌。
- sflex-end与文档流方向相关，默认表现为底部堆放。
- scenter表现为整体垂直居中对齐。
- space-between表现为上下两行两端对齐，剩下的每一行元素等分剩余空间。
- space-around表现为每一行元素上下都享有独立不重叠的空白空间。
- space-evenly表现为每一行元素上下的空白空间的大小都是一致的。

2.9 order属性与单个子项的顺序控制
设置order属性来改变某一个flex子项的排序位置。
`order: <integer>; /* 整数值，默认值是 0 */`
想要某一个flex子项在最前面显示，则可以设置比0小的整数（如−1）就可以。

2.10 必读：深入理解flex属性
理解flex-grow属性、flex-shrink属性和flex-basis属性
 - flex-basis指定的分配基础尺寸。 
 - flex-grow指定了容器**剩余空间多余**时候的分配规则，默认值是0，表示**多余空间不分配**。
 - flex-shrink指定了容器**剩余空间不足**时候的分配规则，默认值是1，表示**空间不足要分配**。

`flex-basis: <length> | auto; /* 长度值，默认值是 auto */`
`flex-grow/flex-shrink: <number>; /* 数值，可以是小数，默认值是 0 */`
- 如果flex-grow属性值小于1，则flex子项扩展的空间就是总剩余空间和这个比例的计算值。
- 如果flex-grow属性值大于1，则flex子项独享所有剩余空间。

flex属性是弹性布局的精髓，flex属性是flex-grow、flex-shrink和flex-basis这3个CSS属性的缩写。
flex属性做了优化
- `flex:1`等同于`flex:1 1 0%`，`flex:1 2`等同于`flex:1 2 0%`，即**flex-basis使用的不是默认值auto，而是使用的0%**，即基础尺寸为0。
- `flex:100px`等同于`flex:1 1 100px`，即**flex-grow使用的不是默认值0，而是使用的1**，尺寸保持向外的弹性。

`flex: <'flex-grow'> <'flex-shrink'>? || <'flex-basis'>`
双管道符“||”表示或者，可以无序，也可以同时存在；问号“?”表示0个或1个，也就是flexshrink属性可有可无。

2.11 应该在什么时候使用flex:0/1/none/auto
flex-basis：max-width/min-width > flex-basis > width > box

单值语法       等同于              备注
flex: initial      flex: 0 1 auto    初始值，常用，有剩余空间时**不会增长**，尺寸不足时**会收缩**变小。
flex: 0            flex: 0 1 0%      适用场景少，有剩余空间时不会增长，尺寸不足时会收缩变小，基础尺寸是0，表现为最小内容宽度。
flex: none      flex: 0 0 auto    推荐，**不会增长/收缩**，没有弹性变化。
											  基础尺寸是auto，宽度由内容决定，表现为最大内容宽度，内容过长会溢出容器。
flex: 1            flex: 1 1 0%      推荐，**弹性增大/减小**，在容器尺寸不足时会优先最小化内容尺寸
flex: auto       flex: 1 1 auto     适用场景少，但很有用，**弹性增大/减小**，在容器尺寸不足时会优先最大化内容尺寸

适合使用flex:initial的场景
- 常见于按钮、标题、小图标等小部件的排版布局，这些小部件都不会很宽，水平方向的控制多使用justify-content、margin-left:auto和margin-right: auto实现。
- 还适用于一侧内容宽度固定，另外一侧内容宽度不固定的两栏自适应布局场景。
- 就是在那些希望元素尺寸收缩，同时元素内容较多又能自动换行的场景中可以不做任何flex属性设置。

适合使用flex:0的场景
- 适合场景并不多，除非元素内容的主体是替换元素，这种情况下文字内容就会被包围在替换元素的宽度下，从而不会出现“一行一字”的排版效果。

适合使用flex:none的场景
- 宽度就是内容的宽度，且内容永远不会换行时。例如列表右侧操作按钮，对按钮元素而言，里面的文字内容一定是不能换行的。
```css
<div class="container">
	<img src="1.jpg">
	<p>右侧按钮设置了flex:none，按钮正常显示了。</p>
	<button class="none">按钮</button>
</div>
.container {
	display: flex;
	padding: .5rem;
	border: 1px solid lightgray;
	background-color: #fff;
}
img {
	width: 3rem; height: 3rem;
	margin-right: .5rem;
}
button {
	align-self: center;
	padding: 5px;
	margin-left: .5rem;
}
.none {
	flex: none;
}
/* 除了给<button>元素设置flex:none，在这个例子中，我们还可以通过给<p>元素设置flex:1实现类似的效果。*/
```

适合使用flex:1的场景
- 希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候
- 适用于无规律布局中动态内容元素

适合使用flex:auto的场景
- 当希望元素充分利用剩余空间，但是元素各自的尺寸又需要按照各自内容进行分配的时候
- 用于内容固定和内容可控的布局场景，例如导航数量不固定且每个导航文字数量也不固定的导航效果
```css
/* 导航数量不固定且每个导航文字数量也不固定，基于内容自动分配宽度的自适应导航 */
<nav class="flex">
	<span>首页</span>
	<span>排行榜</span>
	<span>我的订单</span>
	<span>个人中心</span>
</nav>

nav span {
	flex: auto;
	line-height: 3rem;
	background: #444;
	color: #fff;
	text-align:center;
}
span + span {
	border-left: 1px solid #eee;
}
```

总结一下：
- flex:initial表示默认的弹性布局状态，无须专门设置，适合小控件元素的分布布局（其中某一个flex子项的内容动态变化也没有关系）。
- flex:0适用场景较少，适合设置在替换元素的父元素上。
- flex:none适合设置在内容不能换行显示的小控件元素上，如按钮。
- flex:1适合等分布局。
- flex:auto适合基于内容动态适配的布局。

2.12 详细了解flex-basis属性与尺寸计算规则
最终尺寸计算的优先级是：最大最小尺寸限制 > 弹性增长或收缩 > 基础尺寸
- **基础尺寸**由flex-basis属性或width属性，以及box-sizing盒模型共同决定；
	- （1）如果flex-basis属性和width属性同时设置了具体的数值，width属性值会被忽略，优先使用flex-basis的属性值作为基础尺寸。
	- （2）如果flex-basis的属性值是初始值auto，则会使用width属性设置的长度值作为基础尺寸。
	- （3）如果flex-basis和width的属性值都是auto，则会使用flex子项的**最大内容宽度作为基础尺寸，此时称为“内容尺寸”**。
- **内容尺寸**指最大内容宽度，当没有设置基础尺寸时会顶替基础尺寸的角色；
	- flex默认值initial表现为收缩，通过弹性收缩让文字内容自然换行，不会超出容器宽度。
	- 因此，要想暴露flex子项真实的内容尺寸，只需要设置flex-shrink属性值为0或者设置flex:none就可以。
- **弹性增长**指的是flex-grow属性，**弹性收缩**指的是flex-shrink属性；
- **最大尺寸**主要受max-width属性限制；**最小尺寸**则比较复杂，受最小内容宽度、width属性和min-width属性共同影响。

3、网格布局
3.1 grid-template-columns和grid-template-rows属性简介
grid-template-columns和grid-template-rows属性主要用来指定网格的数量和尺寸等信息。

3.2 了解网格布局专用单位fr
3.3 详细介绍minmax()和fit-content()函数
3.4 repeat()函数的详细介绍
3.5 了解grid-template-areas属性
3.6 缩写属性grid-template
3.7 了解grid-auto-columns和grid-auto-rows属性
3.8 深入了解grid-auto-flow属性
3.9 缩写属性grid
3.10 间隙设置属性column-gap和row-gap（grid-column-gap和grid- row-gap）
3.11 缩写属性gap（grid-gap）
3.12 元素对齐属性justify-items和align-items
3.13 缩写属性place-items
3.14 整体对齐属性justify-content和align-content
3.15 缩写属性place-content
3.16 区间范围设置属性grid-column-start/grid-column-end和grid-row-start/ grid-row-end
3.17 缩写属性grid-column和grid-row
3.18 缩写属性grid-area外加区域范围设置
3.19 grid子项对齐属性justify-self和align-self
3.20 缩写属性place-self

4、CSS Shapes布局
实现不规则的图文环绕效果，它需要和float属性配合使用。

4.1 详细了解shape-outside属性
- none很好理解，表示普通的矩形环绕。
- `<shape-box>`（图形盒子）是图形相关布局中的一个名词，`<shape-box>`比clip-path属性中的`<geometry-box>`（几何盒子）支持的盒子类型要少一些，就只有CSS2.1中的4种基本盒模型，分别是margin-box、border-box、padding-box和content-box。`<shape-box>`的作用是指定文字环绕时依照哪个盒子的边缘来计算。
- `<basic-shape>`指基本形状函数，它和clip-path剪裁属性支持的基本形状函数一模一样。
- `<image>`指图像类，包括URL链接图像、渐变图像、cross-fade()函数图像、element ()函数图像等。

4.2 了解shape-margin属性
控制文字环绕图形时文字与元素边界的距离。

4.3 了解shape-image-threshold属性
图像环绕时候的半透明阈值，默认是0.0，也就是图像透明度为0的区域边界才能被文字环绕。