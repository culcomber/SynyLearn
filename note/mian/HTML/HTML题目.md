## 1、标签分类

**根据内容分类**

可以将HTML粗略分类成下面几种类型，这种分类比较宽松，部分HTML标签会有多种分类

<img src="./assets/content_categories_venn.png" alt="标签分类" style="zoom:60%;" />

- **Metadata content:** 提供关于文档的信息，例如 `<title>`、`<meta>`、`<style>`、`<link>` 等。
- **Flow content:** 构成文档主要内容的元素，例如 `<p>`、`<div>`、`<h1>`-`<h6>`、`<ul>`、`<ol>`、`<table`> 等。
- **Sectioning content:** 定义文档结构的元素，例如 `<article>`、`<aside>`、`<nav>`、`<section>` 等。
- **Heading content:** 定义标题的元素，例如 `<h1>`-`<h6>`。
- **Phrasing content:** 构成文本段落的元素，例如 `<span>`、`<a>`、`<strong>`、`<em>` 等。
- **Embedded content:** 嵌入外部内容的元素，例如 `<iframe>`、`<object>`、`<video>`、`<audio>`、`<canvas>`、`<img>` 等。
- **Interactive content:** 允许用户交互的元素，例如 `<a>`、`<button>`、`<input>`、`<textarea>`、`<select>` 等。

**根据显示方式分类:**

- 块级元素 (Block-level element)
- 行内元素 (Inline-level element)
  - 不可以设置宽高，`padding` 和 `margin` 左右会影响布局，`padding` 上下会和别的元素层叠


## 2、语义化标签

**优点:**

- **提高代码可读性:** 语义化标签能够清晰地表达网页结构和内容含义，使代码更易于理解和维护。
- **提高网页可访问性:** 语义化标签能够帮助屏幕阅读器等辅助技术更好地理解网页内容，从而提高网页的可访问性。
- **提高 SEO 性能:** 搜索引擎可以根据语义化标签更好地理解网页内容，从而提高网页的排名。

**常见的 HTML 语义化标签:**

**1. 结构标签:**

- `<header>`: 定义网页的头部区域，通常包含网站logo、导航菜单等。
- `<nav>`: 定义网页的导航区域，通常包含链接列表。
- `<main>`: 定义网页的主要内容区域。
- `<article>`: 定义独立的、完整的文章内容。
- `<aside>`: 定义与主要内容相关的辅助信息，例如侧边栏、广告等。
- `<footer>`: 定义网页的底部区域，通常包含版权信息、联系方式等。
- `<section>`: 定义文档中的一个章节或主题。

**2. 其他语义化标签:**

- `<figure>`: 定义独立的图像、图表、代码示例等。
- `<figcaption>`: 定义 `<figure>` 元素的标题。
- `<time>`: 定义日期或时间。
- `<mark>`: 突出显示文本。
- `<details>`: 定义可展开/折叠的详细信息。
- `<summary>`: 定义 `<details>` 元素的摘要。

在使用 Ant Design 组件库时，可以通过以下方法使用语义化标签：

- 许多 Ant Design 组件本身就使用了语义化标签作为其底层结构。
  - `<Menu>` 组件渲染为 `<nav>` 和 `<ul>` 标签。
  - `<Layout>` 组件渲染为 `<header>`、`<main>`、`<footer>`、`<aside>` 等标签。
- 组合使用 Ant Design 组件和语义化标签。

## 3、SEO

