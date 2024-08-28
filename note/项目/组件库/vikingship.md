# 1、`Typescript`

`npx` ==可以实现命令调用==

# 2、`React`

`FunctionComponent`

```ts
const Hello: React.FunctionComponent<IHelloProps> = (props) => {
    // props.children
    // Hello.defaultProps
    // React.FunctionComponent 简写 React.FC
}
```

# 3、`Button`

## 3.1 初始化项目

```shell
# --template typescript 增加ts依赖
npx create-react-app my-app --template typescript
```

**项目结构**

<img src="../../assets/6f0dbd2bb211ae7c6b09e4ff367a522.jpg" alt="6f0dbd2bb211ae7c6b09e4ff367a522" style="zoom:50%;" />

## 3.2 样式

**解决方案**

- Inline CSS
- CSS in JS
- Styled Component ==是什么==
- ass/Less ==具体怎么实现==

<img src="../../assets/03f67dca81962cb8658a269d2f229d3.jpg" alt="03f67dca81962cb8658a269d2f229d3" style="zoom:40%;" />

**色彩体系**

- 系统色板：基础色板 + 中性色板（在基础色板上面明暗度变化）
- 产品色板：品牌色 + 功能色板

==todo==

```shell
# npx不支持sass 需要预处理器
npm i node-sass --save
```

==sass default属性==

**变量分类**

- 基础色彩系统

- 字体系统：字体样式、字体大小、字重、行高、标题大小、链接、body

  ==等宽monospace、rem、找找其他组件库的变量==

- 表单

- 按钮

- 边框和阴影

- 可配置开关

越多变量定义代表后面越高可配置化

**重置样式**

`_reboot.scss`

**导入样式**

`index.scss` ==导入的样式没有额外请求==

==样式名称最前面有下划线，该文件只能导入，不能直接使用==

## 3.3 Button

**需求分析**

- `Type`：primary、default、danger、link
- `Size`：normal、small、large
- `Disable`

<img src="../../assets/a137e6f7f197264f38939f287eaf37f.jpg" alt="a137e6f7f197264f38939f287eaf37f" style="zoom:40%;" />

**组件编码**

```shell
classname
@type/classname

disable样式
mixin
```

# 4、组件测试

React组件适合单元测试

- Component 组件：互不影响
- Function 函数：纯函数方便写测试
- 单向数据流：只要测试是否触发相应回调



# 5、`Menu`

# 6、`Icon` 和 `Transtion`

# 7、`Stroybook`

# 8、`Input` 和 `AutoComplete`

# 9、`Upload`

# 10、`From`

# 11、模块打包

# 12、`CICD`

# 13、`Rollup`



