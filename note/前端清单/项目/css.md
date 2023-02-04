1、background

`background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;`

background-color：指定要使用的背景颜色

background-position：指定背景图像的位置

background-size：指定背景图片的大小

background-repeat：指定如何重复背景图像

background-origin：指定背景图像的定位区域

background-clip：指定背景图像的绘画区域

background-attachment：设置背景图像是否固定或者随着页面的其余部分滚动

background-image：指定要使用的一个或多个背景图像

background-blend-mode：义了背景层的混合模式（图片与颜色）

2、border

border

- border-width：定边框的宽度

- border-style：指定边框的样式

- border-color：指定边框的颜色

border-image

- border-image-source
- border-image-slice
- border-image-width
- border-image-outset 
- border-image-repeat

border-radius：设置元素的外边框圆角

border-collapse：设置表格的边框是否被合并为一个单一的边框

border-spacing：设置相邻单元格的边框间的距离

3、object-fit

object-fit：对图片进行剪切，保留原始比例：

| 值         | 描述     |
| :--------- | :--------------------------------------------------- |
| fill       | 默认，不保证保持原有的比例，内容拉伸填充整个内容容器。       |
| contain    | 保持原有尺寸比例。内容被缩放。                             |
| cover      | 保持原有尺寸比例。但部分内容可能被剪切。                     |
| none       | 保留原有元素内容的长度和宽度，也就是说内容不会被重置。       |
| scale-down | 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。 |

object-position：根据容器大小重置图片的大小，并设置图片的位置

| 值         | 描述                                                         |      |
| :--------- | :----------------------------------------------------------- | ---- |
| *position* | 第一个值为 x 坐标位置的值，第二个值为 y 坐标位置的值。表示的方式有：`object-position: 50% 50%; object-position: right top; object-position: left bottom; object-position: 250px 125px;` |      |

