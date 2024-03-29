## 1、基本操作

`4K`屏幕菜单小，可以 编辑--偏好设置--界面--分辨率缩放1.5

**添加物体** shift + A

**放大缩小** 

- 滚动滑轮
- 平滑缩放 ctrl + 按住鼠标中键 + 前后滑动鼠标
- 按住放大键滑动鼠标

<img src="../assets/image-20240112193100370.png" alt="image-20240112193100370" style="zoom:40%;" />

**旋转** 

- 按住滚轮
- 按住鼠标左键拖动右上角圆圈
- Alt + 按住鼠标左键

<img src="../assets/image-20240112193013191.png" alt="image-20240112193013191" style="zoom:40%;" />

**非焦点平移** 

- shift + 按住鼠标中键 + 前后滑动鼠标
- 左键按住小手滑动图标

**移动物体** 

- 选中 + G + 移动鼠标

- 轴移动物体 选中 + G + X/Y/Z/按住鼠标中键 +移动鼠标  

- 取消移动回到原点 esc / 右键点击


**导出图像** F12 / 渲染--导出图像

**切换摄像机视角** 0

**移动摄像机** 

- 直接移动/在摄像机视角下移动 G选中，鼠标移动，XYZ按键方向移动，按鼠标中键放大缩小（物体是快速选中XYZ）

- N唤出菜单，暂时跟随摄像机视角，此时摄影机是焦点


<img src="../assets/image-20240116130108615.png" alt="image-20240116130108615" style="zoom:33%;" />

**缩放** 

- 普通 S

- 轴缩放 S + X/X/Z


**旋转**

- 焦点旋转 R

- 焦点轴旋转 R + X/X/Z

- 自由旋转 R + 鼠标中键


**新建材质**

<img src="../assets/image-20240116131132893.png" alt="image-20240116131132893" style="zoom:40%;" />

## 2、面包圈

新建物体后，快速编辑 F9

分辨率太高对新手不友好，而且渲染时间很长

<img src="../assets/image-20240118131935154.png" alt="image-20240118131935154" style="zoom:40%;" />

**减少锯齿感** 

右键--平滑着色 不会影响渲染时间但是看起来分辨率很高的样子

恢复原状，平直着色

<img src="../assets/image-20240118132900360.png" alt="image-20240118132900360" style="zoom:33%;" />

外形锯齿感修改 表面细分，增加更多平面达到细节优化效果

<img src="../assets/image-20240118132354789.png" alt="image-20240118132354789" style="zoom:20%;" />

ctrl + 1

<img src="../assets/image-20240118132515081.png" alt="image-20240118132515081" style="zoom:33%;" />

视图层级--blender中看到  渲染--最后的成图

<img src="../assets/image-20240118133224685.png" alt="image-20240118133224685" style="zoom:33%;" />

太光滑完美 进入编辑模式 Tab

<img src="../assets/image-20240123132843893.png" alt="image-20240123132843893" style="zoom:50%;" />

## 3、糖霜

复制物体 shift + D

重命名 双击名字 / F2

<img src="../assets/image-20240125130539278.png" alt="image-20240125130539278" style="zoom:40%;" />

删除下半部分 打开透视模式

<img src="../assets/image-20240219132017064.png" alt="image-20240219132017064" style="zoom:33%;" />

切换平面 点击 `XYZ` 或 网格

<img src="../assets/image-20240219132207484.png" alt="image-20240219132207484" style="zoom:33%;" />

点击delete会有选择菜单

<img src="../assets/image-20240219132404534.png" alt="image-20240219132404534" style="zoom:33%;" />

给糖霜增加厚度 0.025 1

<img src="../assets/image-20240219132716672.png" alt="image-20240219132716672" style="zoom:33%;" />

实体化修改器挡住视线

关闭编辑模式下的修改器效果

<img src="../assets/image-20240219133158724.png" alt="image-20240219133158724" style="zoom:33%;" />

糖霜往下拉，糖霜没有吸附到甜甜圈上面

开启吸附模式

<img src="../assets/image-20240313131259019.png" alt="image-20240313131259019" style="zoom:20%;" />

<img src="../assets/image-20240313131145414.png" alt="image-20240313131145414" style="zoom:50%;" />

默认吸附到网格平面，要吸附到甜甜圈上面，需要修改配置为吸附到面

<img src="../assets/image-20240313131446216.png" alt="image-20240313131446216" style="zoom:33%;" />

<img src="../assets/image-20240314125808167.png" alt="image-20240314125808167" style="zoom:33%;" />

拖动过程中糖霜的点穿透甜甜圈，开启面投射

<img src="../assets/image-20240314130131369.png" alt="image-20240314130131369" style="zoom:20%;" />

<img src="../assets/image-20240314130253702.png" alt="image-20240314130253702" style="zoom:35%;" />

拖动过程中烫糖霜细节不够，应用修改器，增加细节

<img src="../assets/image-20240314131328881.png" alt="image-20240314131328881" style="zoom:20%;" />

<img src="../assets/image-20240314131614079.png" alt="image-20240314131614079" style="zoom:20%;" />

<img src="../assets/image-20240314131650436.png" alt="image-20240314131650436" style="zoom:33%;" />

拖动过程中影响到了其他面，隐藏不需要修改的面

<img src="../assets/image-20240314132012492.png" alt="image-20240314132012492" style="zoom:20%;" />

双击选中一圈，ctrl + 数字键盘+/- 扩展选中，点击H隐藏，Alt + H 显示

扩展选区菜单如下

<img src="../assets/image-20240314132648989.png" alt="image-20240314132648989" style="zoom:35%;" />

边缘是直角，增加细节，修改器顺序很重要，先增加厚度，然后修改细节

<img src="../assets/image-20240315131149615.png" alt="image-20240315131149615" style="zoom:25%;" />

<img src="../assets/image-20240315131331650.png" alt="image-20240315131331650" style="zoom:35%;" />

下边缘是尖，修改增加厚度修改器的边数据，折痕内侧修改为1

<img src="../assets/image-20240315131413918.png" alt="image-20240315131413918" style="zoom:25%;" />

增加流下水珠

点击一个点，shift+点击第二个点，点击E同时下移两个点，移动鼠标，点击鼠标左键确认位置，创建一个平面，重复点击E，不断创造平面

<img src="../assets/image-20240315132214523.png" alt="image-20240315132214523" style="zoom:25%;" />

## 4、雕刻

1、在衰减时部分节点在边缘，容易造成错位，点击G选中点，移动到合适位置

<img src="../assets/image-20240322125136882.png" alt="image-20240322125136882" style="zoom:40%;" />

2、有些部分和模型分离，关掉衰减，点击G选中点，就会恢复

<img src="../assets/image-20240322124715620.png" alt="image-20240322124715620" style="zoom:25%;" />

<img src="../assets/image-20240322124741085.png" alt="image-20240322124741085" style="zoom:25%;" />

3、使用修改器帮助修正

shrink wrap modifier

<img src="../assets/image-20240322125528347.png" alt="image-20240322125528347" style="zoom:35%;" />

将网格收缩到物体，目标上面的小吸管可以选择物品

<img src="../assets/image-20240322125900299.png" alt="image-20240322125900299" style="zoom:35%;" />

修改器的执行顺序是从上到下，糖霜收缩到甜甜圈应该发生在糖霜突出之前

<img src="../assets/image-20240322130016612.png" alt="image-20240322130016612" style="zoom:35%;" />

<img src="../assets/image-20240322130030376.png" alt="image-20240322130030376" style="zoom:15%;" />

移动到合适位置后，应用修改器，就不用像1/2两步一样一个个修改

<img src="../assets/image-20240322130324418.png" alt="image-20240322130324418" style="zoom:35%;" />

4、糖霜底部边缘比起顶部更厚

进入编辑模式，拖动网格并不会增加厚度，糖霜厚度是修改器生成的，**让这个厚度生成，应用掉这个修改器**

<img src="../assets/image-20240322131000800.png" alt="image-20240322131000800" style="zoom:25%;" />

<img src="../assets/image-20240322131041121.png" alt="image-20240322131041121" style="zoom:25%;" />

此时就可以拖动外边的节点增加厚度，但是一个个操作很繁琐，编辑模式适合精细调整

<img src="../assets/image-20240322131415487.png" alt="image-20240322131415487" style="zoom:33%;" />

organic freehand tool —— sculpting 雕刻可以快速添加很多复杂的形状

<img src="../assets/image-20240322131716743.png" alt="image-20240322131716743" style="zoom:35%;" />

点击F后，滑动鼠标可以修改笔刷尺寸

shift + F 修改强度

<img src="../assets/image-20240322132348792.png" alt="image-20240322132348792" style="zoom:33%;" />

底部增加厚度后，因为细节不够导致锯齿干，应用网格修改器，视图层级增加网格，1-->4    2-->4*4=16

<img src="../assets/image-20240322133406623.png" alt="image-20240322133406623" style="zoom:33%;" />

<img src="../assets/image-20240326125111393.png" alt="image-20240326125111393" style="zoom:33%;" />

做出夸张水滴

<img src="../assets/image-20240326132133862.png" alt="image-20240326132133862" style="zoom:50%;" />

<img src="../assets/image-20240326132119973.png" alt="image-20240326132119973" style="zoom:25%;" />

<img src="../assets/image-20240326132250762.png" alt="image-20240326132250762" style="zoom:25%;" />

遮罩，可以取消应用雕刻效果，勾选仅前面的面，不然遮罩会涂抹到后面

<img src="../assets/image-20240326135701915.png" alt="image-20240326135701915" style="zoom:33%;" />

<img src="../assets/image-20240328125905546.png" alt="image-20240328125905546" style="zoom:33%;" />

<img src="../assets/image-20240328130903897.png" alt="image-20240328130903897" style="zoom:33%;" />

仅看到选中物体 / 

<img src="../assets/image-20240328130105903.png" alt="image-20240328130105903" style="zoom:25%;" />

反转遮罩选中内容 Ctrl+I，此时选中膨胀笔刷，只会对边缘有影响

<img src="../assets/image-20240328131307204.png" alt="image-20240328131307204" style="zoom:23%;" />

如果要对边缘做统一膨胀处理，网格滤镜：将一个统一的值应用到整个模型上

<img src="../assets/image-20240328131417730.png" alt="image-20240328131417730" style="zoom:50%;" />

可以改变效果如下，鼠标往右拖动就会膨胀，鼠标往左拖动就会向内压缩（方向效果）

<img src="../assets/image-20240328131629059.png" alt="image-20240328131629059" style="zoom:50%;" />

降低强度，方便控制

<img src="../assets/image-20240328132217202.png" alt="image-20240328132217202" style="zoom:50%;" />

边缘过度太生硬，使用平滑遮罩

<img src="../assets/image-20240328132059857.png" alt="image-20240328132059857" style="zoom:50%;" />

存在虚影，遮罩本身虚化，作用效果不是很准确

<img src="../assets/image-20240328132657658.png" alt="image-20240328132657658" style="zoom:25%;" />

关闭遮罩

<img src="../assets/image-20240328132837352.png" alt="image-20240328132837352" style="zoom:50%;" />

使用光滑笔刷

<img src="../assets/image-20240328132915857.png" alt="image-20240328132915857" style="zoom:50%;" />

<img src="../assets/image-20240328133008560.png" alt="image-20240328133008560" style="zoom:50%;" />
