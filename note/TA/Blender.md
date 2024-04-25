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

<img src="../assets/image-20240313131259019.png" alt="image-20240313131259019" style="zoom:20%;" /><img src="../assets/image-20240313131145414.png" alt="image-20240313131145414" style="zoom:50%;" />

默认吸附到网格平面，要吸附到甜甜圈上面，需要修改配置为吸附到面

<img src="../assets/image-20240313131446216.png" alt="image-20240313131446216" style="zoom:33%;" /><img src="../assets/image-20240314125808167.png" alt="image-20240314125808167" style="zoom:33%;" />

拖动过程中糖霜的点穿透甜甜圈，开启面投射

<img src="../assets/image-20240314130131369.png" alt="image-20240314130131369" style="zoom:20%;" /><img src="../assets/image-20240314130253702.png" alt="image-20240314130253702" style="zoom:35%;" />

拖动过程中烫糖霜细节不够，应用修改器，增加细节

<img src="../assets/image-20240314131328881.png" alt="image-20240314131328881" style="zoom:20%;" /><img src="../assets/image-20240314131614079.png" alt="image-20240314131614079" style="zoom:20%;" /><img src="../assets/image-20240314131650436.png" alt="image-20240314131650436" style="zoom:33%;" />

拖动过程中影响到了其他面，隐藏不需要修改的面

<img src="../assets/image-20240314132012492.png" alt="image-20240314132012492" style="zoom:20%;" />

双击选中一圈，ctrl + 数字键盘+/- 扩展选中，点击H隐藏，Alt + H 显示

扩展选区菜单如下

<img src="../assets/image-20240314132648989.png" alt="image-20240314132648989" style="zoom:35%;" />

边缘是直角，增加细节，修改器顺序很重要，先增加厚度，然后修改细节

<img src="../assets/image-20240315131149615.png" alt="image-20240315131149615" style="zoom:25%;" /><img src="../assets/image-20240315131331650.png" alt="image-20240315131331650" style="zoom:35%;" />

下边缘是尖，修改增加厚度修改器的边数据，折痕内侧修改为1

<img src="../assets/image-20240315131413918.png" alt="image-20240315131413918" style="zoom:25%;" />

增加流下水珠

点击一个点，shift+点击第二个点，点击E同时下移两个点，移动鼠标，点击鼠标左键确认位置，创建一个平面，重复点击E，不断创造平面

<img src="../assets/image-20240315132214523.png" alt="image-20240315132214523" style="zoom:25%;" />

## 4、雕刻

1、在衰减时部分节点在边缘，容易造成错位，点击G选中点，移动到合适位置

<img src="../assets/image-20240322125136882.png" alt="image-20240322125136882" style="zoom:40%;" />

2、有些部分和模型分离，关掉衰减，点击G选中点，就会恢复

<img src="../assets/image-20240322124715620.png" alt="image-20240322124715620" style="zoom:25%;" /><img src="../assets/image-20240322124741085.png" alt="image-20240322124741085" style="zoom:25%;" />

3、使用修改器帮助修正

shrink wrap modifier

<img src="../assets/image-20240322125528347.png" alt="image-20240322125528347" style="zoom:35%;" />

将网格收缩到物体，目标上面的小吸管可以选择物品

<img src="../assets/image-20240322125900299.png" alt="image-20240322125900299" style="zoom:35%;" />

修改器的执行顺序是从上到下，糖霜收缩到甜甜圈应该发生在糖霜突出之前

<img src="../assets/image-20240322130016612.png" alt="image-20240322130016612" style="zoom:35%;" /><img src="../assets/image-20240322130030376.png" alt="image-20240322130030376" style="zoom:15%;" />

移动到合适位置后，应用修改器，就不用像1/2两步一样一个个修改

<img src="../assets/image-20240322130324418.png" alt="image-20240322130324418" style="zoom:35%;" />

4、糖霜底部边缘比起顶部更厚

进入编辑模式，拖动网格并不会增加厚度，糖霜厚度是修改器生成的，**让这个厚度生成，应用掉这个修改器**

<img src="../assets/image-20240322131000800.png" alt="image-20240322131000800" style="zoom:25%;" /><img src="../assets/image-20240322131041121.png" alt="image-20240322131041121" style="zoom:25%;" />

此时就可以拖动外边的节点增加厚度，但是一个个操作很繁琐，编辑模式适合精细调整

<img src="../assets/image-20240322131415487.png" alt="image-20240322131415487" style="zoom:33%;" />

organic freehand tool —— sculpting 雕刻可以快速添加很多复杂的形状

<img src="../assets/image-20240322131716743.png" alt="image-20240322131716743" style="zoom:35%;" />

点击F后，滑动鼠标可以修改笔刷尺寸

shift + F 修改强度

<img src="../assets/image-20240322132348792.png" alt="image-20240322132348792" style="zoom:33%;" />

底部增加厚度后，因为细节不够导致锯齿干，应用网格修改器，视图层级增加网格，1-->4    2-->4*4=16

<img src="../assets/image-20240322133406623.png" alt="image-20240322133406623" style="zoom:33%;" /><img src="../assets/image-20240326125111393.png" alt="image-20240326125111393" style="zoom:33%;" />

做出夸张水滴

<img src="../assets/image-20240326132133862.png" alt="image-20240326132133862" style="zoom:50%;" /><img src="../assets/image-20240326132119973.png" alt="image-20240326132119973" style="zoom:25%;" /><img src="../assets/image-20240326132250762.png" alt="image-20240326132250762" style="zoom:25%;" />

遮罩，可以取消应用雕刻效果，勾选仅前面的面，不然遮罩会涂抹到后面

<img src="../assets/image-20240326135701915.png" alt="image-20240326135701915" style="zoom:33%;" /><img src="../assets/image-20240328125905546.png" alt="image-20240328125905546" style="zoom:33%;" /><img src="../assets/image-20240328130903897.png" alt="image-20240328130903897" style="zoom:33%;" />

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

<img src="../assets/image-20240328132915857.png" alt="image-20240328132915857" style="zoom:50%;" /><img src="../assets/image-20240328133008560.png" alt="image-20240328133008560" style="zoom:50%;" />

## 5、材质

<img src="../assets/image-20240401125255926.png" alt="image-20240401125255926" style="zoom:50%;" />

shift + A 增加网格——平面，S拉伸3倍大

糖霜附着到甜甜圈上面，父子级绑定，选定子级，shift选中父级，Ctrl+P进行绑定，移动的时候是选中子级

<img src="../assets/image-20240401130511130.png" alt="image-20240401130511130" style="zoom:50%;" />

给平面增加不是纯色的材质

<img src="../assets/image-20240401131336670.png" alt="image-20240401131336670" style="zoom:50%;" />

选择图片

<img src="../assets/image-20240401135336273.png" alt="image-20240401135336273" style="zoom:50%;" />

右侧菜单不适合做大量材质处理，打开Shading面板

<img src="../assets/image-20240401132438869.png" alt="image-20240401132438869" style="zoom:50%;" />

用不到的面板，在两个面板分割线处右键，选择合并区域

<img src="../assets/image-20240401132706614.png" alt="image-20240401132706614" style="zoom:50%;" />

将原本右侧菜单的材质面板（简化版本）扩展成下面的节点，改变节点右侧菜单同步修改

<img src="../assets/image-20240409125253901.png" alt="image-20240409125253901" style="zoom:50%;" />

两个节点之间 shift + A 可以增加新节点，调节色相饱和度

<img src="../assets/image-20240409125459528.png" alt="image-20240409125459528" style="zoom:50%;" />

也可以直接点解要修改的参数旁边的节点

<img src="../assets/image-20240409125716623.png" alt="image-20240409125716623" style="zoom:50%;" />

给大理石添加粗糙的信息，防止每一处都是一样的光滑，这个张图片不是普通的图片，需要设置节点颜色信息为no-color，让blender处理时只关注图片数值信息

<img src="../assets/image-20240409125946792.png" alt="image-20240409125946792" style="zoom:50%;" />

增加大理石凹凸效果，需要调整法向信息，本质指面的朝向，通过调整法线伪造细节

<img src="../assets/image-20240409130957837.png" alt="image-20240409130957837" style="zoom:50%;" />

需要将图像纹理转换成着色器可以识别的信息

<img src="../assets/image-20240409131155162.png" alt="image-20240409131155162" style="zoom:50%;" />

ctrl + space可以关闭节点处理面板

N唤出面板，可以直接使用poliigon插件

通过/可以隔离糖霜和甜甜圈，也会隔离灯光，使用材质预览就可以看到有灯光的颜色

<img src="../assets/image-20240410130650260.png" alt="image-20240410130650260" style="zoom:33%;" />

甜甜圈中间通常有白边，进入纹理面板，直接在模型上绘制贴图

<img src="../assets/image-20240409132221033.png" alt="image-20240409132221033" style="zoom:50%;" />

顶部菜单显示不全，在顶部使用滚轮滑动菜单

<img src="../assets/image-20240410130841609.png" alt="image-20240410130841609" style="zoom:50%;" />

需要增加绘制的载体

<img src="../assets/image-20240409132444000.png" alt="image-20240409132444000" style="zoom:33%;" />

改变甜甜圈材质

<img src="../assets/image-20240410131035413.png" alt="image-20240410131035413" style="zoom:40%;" />

新建纯色材质，如果色盘是黑色，滑动右侧圆点到最上面

<img src="../assets/image-20240410131419299.png" alt="image-20240410131419299" style="zoom:50%;" />

右侧面板选择新建好的材质，此时左右两边绘制是同步的，原理是把右侧的`3D`模型展开成左侧平面(UV unwrapping)

<img src="../assets/image-20240410131625824.png" alt="image-20240410131625824" style="zoom:33%;" />

选择笔刷颜色，比甜甜圈材质偏白写些，可以使用吸色笔

<img src="../assets/image-20240410132201972.png" alt="image-20240410132201972" style="zoom:50%;" />

保存材质

<img src="../assets/image-20240410132827123.png" alt="image-20240410132827123" style="zoom:50%;" />

## 6、糖针

来到集合节点面板，点击新增，集合节点是修改器，添加之后右侧菜单就会出现集合节点的修改器

<img src="../assets/image-20240411125651454.png" alt="image-20240411125651454" style="zoom:50%;" />

最左边是网格输入，最右边是网格输出，增加一个移动网格位置的节点，模型向上移动，但是网格没有变化，

<img src="../assets/c5cb97198177199529114ff8695b370.jpg" alt="c5cb97198177199529114ff8695b370" style="zoom:33%;" />

可以将移动网格位置的节点的参数暴露给输入节点，这样就可以在修改器面板快速调节偏移参数

<img src="../assets/image-20240411130545104.png" alt="image-20240411130545104" style="zoom:50%;" />

糖针——分布一些点到模型上

<img src="../assets/image-20240411131029015.png" alt="image-20240411131029015" style="zoom:50%;" /><img src="../assets/image-20240411131340568.png" alt="image-20240411131340568" style="zoom:50%;" />

因为输入糖霜模型-->将糖霜变成点分布-->输入糖霜模型，所以糖霜消失了，点和模型都需要，增加合并集合节点的Node

<img src="../assets/image-20240411131650344.png" alt="image-20240411131650344" style="zoom:33%;" />

合并几何和左侧输入是长条型，说明可以接受多个输入，把最左边糖霜模型接入到合并几何，这样糖霜和点都有了

<img src="../assets/image-20240411131817258.png" alt="image-20240411131817258" style="zoom:33%;" />

此时，输出模型是看不到糖霜的，如果需要渲染，需要告诉blender需要渲染成什么，所以需要新建物体作为糖针

<img src="../assets/image-20240411132302608.png" alt="image-20240411132302608" style="zoom:40%;" />

<img src="../assets/image-20240411132519250.png" alt="image-20240411132519250" style="zoom:33%;" />

右上方没有糖霜节点，可以在模型中直接选中，可以把糖霜的集合节点面板固定

<img src="../assets/image-20240411132732209.png" alt="image-20240411132732209" style="zoom:50%;" />

在集合节点中引用模型

1、将右上方模型直接拉到几何模型面板

<img src="../assets/image-20240411133110375.png" alt="image-20240411133110375" style="zoom:50%;" />

2、添加新的节点引用模型

<img src="../assets/image-20240411133347934.png" alt="image-20240411133347934" style="zoom:50%;" />

3、新节点放在 `分布点于面上` 和 `合并几何` 中间，现在点消失了，因为 `实例化于点上` 代替了 `分布点于面上` 

<img src="../assets/image-20240411133340658.png" alt="image-20240411133340658" style="zoom:50%;" />

4、将模型连接到 `实例化于点上`

<img src="../assets/image-20240411133731305.png" alt="image-20240411133731305" style="zoom:50%;" />

解决问题

1、糖霜之间会相互覆盖，改变分布方式

<img src="../assets/image-20240412123849422.png" alt="image-20240412123849422" style="zoom:50%;" /><img src="../assets/image-20240412124709031.png" alt="image-20240412124709031" style="zoom:50%;" />

2、糖霜底部不需要糖针，使用权重绘制，新建数据修改器，然后新建 `已命名节点`，`已命名节点` 的名称选择数据修改器，然后就可以开始绘制，1表示展示，0表示不展示，ctrl可以切换权重

<img src="../assets/image-20240412124814819.png" alt="image-20240412124814819" style="zoom:50%;" /><img src="../assets/image-20240412125207009.png" alt="image-20240412125207009" style="zoom:50%;" /><img src="../assets/image-20240412125319388.png" alt="image-20240412125319388" style="zoom:50%;" /><img src="../assets/image-20240412125418482.png" alt="image-20240412125418482" style="zoom:50%;" />

3、球体锯齿感严重，选中物体，平滑着色，快速选中：数字键盘`.` / `~`查看所选，可以选中让物体居中

4、复制一个新的甜甜圈，使用不同密度的糖针，把密度值暴露出来，然后就可以在各自糖霜修改中自定义，N调出面板可以重命名 `密度最大值`，几何节点可以制作一些自定义程度非常高的东西，并且方便的调用

<img src="../assets/image-20240412131449898.png" alt="image-20240412131449898" style="zoom:50%;" /><img src="../assets/image-20240412132340106.png" alt="image-20240412132340106" style="zoom:50%;" />

5、调整甜甜圈大小，N调出面板，可以看到物体尺寸，A选中选中所有物体，shift+左键排除摄影机和灯光，S缩放，按住ctrl此时拖动每次缩小0.1，输入具体数值回车，可以准确缩放，选中物体，然后 `ctrl+A` 应用缩放，不然物体大小其实没有改变只是按比例展示

<img src="../assets/image-20240412133549470.png" alt="image-20240412133549470" style="zoom:50%;" />

6、糖针不见了，因为糖针的密度是相对与整个空间的，调整糖针密度为原来十倍，修改距离最小值

<img src="../assets/image-20240412135810972.png" alt="image-20240412135810972" style="zoom:50%;" />

7、糖针密度太大，修改起来不方便，100200和100000没有区别，增加一个数值计算的节点

<img src="../assets/image-20240415125401533.png" alt="image-20240415125401533" style="zoom:50%;" /><img src="../assets/image-20240415125724780.png" alt="image-20240415125724780" style="zoom:50%;" />

<img src="../assets/image-20240415125538369.png" alt="image-20240415125538369" style="zoom:50%;" />

## 7、长糖针

blender会根据游标位置新建物体，通过 `shift+右键` 可以移动游标

<img src="../assets/image-20240416130707742.png" alt="image-20240416130707742" style="zoom:50%;" />

创建圆柱体

<img src="../assets/image-20240416131002954.png" alt="image-20240416131002954" style="zoom:50%;" />

防止被裁剪，需要调节裁起点，在输入框按住左键，左右拖动可以快速调节数值

<img src="../assets/image-20240416131307459.png" alt="image-20240416131307459" style="zoom:50%;" />

建立长糖针两端圆角，进入编辑模式的面，左键选中一个面，shift+右键选中另一个面，ctrl + B拉伸，鼠标向上/下移动可以增加平面

<img src="../assets/image-20240416132033857.png" alt="image-20240416132033857" style="zoom:50%;" />

shift+D复制，x往轴移动，进入编辑模式，选择点模式，打开透视模式，选中上方的点，关掉衰减，G选中，Z往上拖动

<img src="../assets/image-20240416133451891.png" alt="image-20240416133451891" style="zoom:33%;" />

弯曲，靠近物体 `ctrl + r` 然后滚动滑动，增加切面，左键确定，右键取消移动，就可以居中了；然后增加修改器，最后应用修改器

<img src="../assets/image-20240423131204826.png" alt="image-20240423131204826" style="zoom:20%;" /><img src="../assets/image-20240423131704989.png" alt="image-20240423131704989" style="zoom:50%;" />

因为复制短糖针，导致长糖针质心不在中间，选中右键，选择几何中心作为质心

<img src="../assets/image-20240423132937161.png" alt="image-20240423132937161" style="zoom:33%;" /><img src="../assets/image-20240423133056041.png" alt="image-20240423133056041" style="zoom:33%;" />

新建集合管理物体，可以直接拖拽到集合，或者选中物体后右键，添加到集合

<img src="../assets/image-20240423133308959.png" alt="image-20240423133308959" style="zoom:50%;" />

复制甜甜圈和糖霜后，选中糖霜，和被复制者共用一个几何节点，点击数字就会创建一个新的几何节点了，这样修改就不会影响到圆糖针

<img src="../assets/image-20240424125008248.png" alt="image-20240424125008248" style="zoom:50%;" />

选中长糖针后切换到几何节点面板，取消固定的园糖针，才能看到长糖针

<img src="../assets/image-20240424125546984.png" alt="image-20240424125546984" style="zoom:50%;" />

删除园糖针实例，直接把长糖针集合拖动到集合面板，勾选相关配置，但是长糖针摆放位置有问题，配置旋转，糖针x轴旋转90度R+X+90，ctrl可以增量旋转5度，ctrl+A应用旋转

<img src="../assets/image-20240424125839479.png" alt="image-20240424125839479" style="zoom:40%;" /><img src="../assets/image-20240424130014589.png" alt="image-20240424130014589" style="zoom:40%;" /><img src="../assets/image-20240424130111225.png" alt="image-20240424130111225" style="zoom:50%;" /><img src="../assets/image-20240424130426369.png" alt="image-20240424130426369" style="zoom:40%;" />

让长糖针每个旋转角度不一样

<img src="../assets/image-20240424131211257.png" alt="image-20240424131211257" style="zoom:40%;" /><img src="../assets/image-20240424131740110.png" alt="image-20240424131740110" style="zoom:53%;" />

修改糖针大小

<img src="../assets/image-20240424132032105.png" alt="image-20240424132032105" style="zoom:50%;" />

## 8、渲染

将相同材质应用于多个物体，选中A物体创建材质，shift选中其他要共享物体，最后shift点击A，选中A，shift+L关联到A材质

<img src="../assets/image-20240425130159023.png" alt="image-20240425130159023" style="zoom:50%;" />

切换到着色面板，创建节点，金属度和粗糙度也是用随机值



<img src="../assets/image-20240425130550993.png" alt="image-20240425130550993" style="zoom:33%;" /><img src="../assets/image-20240425130807598.png" alt="image-20240425130807598" style="zoom:33%;" /><img src="../assets/image-20240425132842044.png" alt="image-20240425132842044" style="zoom:33%;" />

