Host Tree

React want to represent some UI with different Host Tree, such as a [DOM tree](https://www.npmjs.com/package/react-dom), an [iOS hierarchy](https://developer.apple.com/library/archive/documentation/General/Conceptual/Devpedia-CocoaApp/View Hierarchy.html).

React useful for helps you write a program that predictably manipulates a complex host tree in response to external events like interactions, network responses, timers, and so on.

Host Tree 宿主树，在宿主环境{例如浏览器}渲染界面，会借助宿主树

Host Instances

The host tree consists of nodes. We’ll call them(nodes) “host instances”. In the DOM environment, host instances are regular DOM nodes.

Host instances have their own properties (e.g. `domNode.className` or `view.tintColor`). They may also contain other host instances as children.

Host Instances 宿主实例(节点)，数组树由数组实例构成

React Elements

In the host environment, a host instance (like a DOM node) is the smallest building block. In React, the smallest building block is a React element.





The same heuristic is used for child trees. For example, when we update a `<dialog>` with two `<button>`s inside, React first decides whether to re-use the `<dialog>`, and then repeats this decision procedure for each child.

如果 `<dialog>`不同不会重新利用 `<button>`？

 If the `type` at the same position (as determined by index and optional `key`) changes, React will throw away the host instances inside, and re-create them.