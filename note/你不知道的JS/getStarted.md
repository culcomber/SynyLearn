## Chapter 1: What Is JavaScript?

Don't use terms like "JS6" or "ES8" to refer to the language. Some do, but those terms only serve to perpetuate confusion. "ES20xx" or just "JS" are what you should stick to.

js三大支柱

- scope/closures

- prototypes/objects

- types/coercion

总结

- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.

- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).

- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.

### 1.1 JS is it an interpreted script or a compiled program?

![image-20221101185310879](C:\Users\sam\AppData\Roaming\Typora\typora-user-images\image-20221101185310879.png)

![image-20221101185342755](C:\Users\sam\AppData\Roaming\Typora\typora-user-images\image-20221101185342755.png)

JS is a parsed language, but is it compiled

![image-20221101185711007](C:\Users\sam\AppData\Roaming\Typora\typora-user-images\image-20221101185711007.png)

1. After a program leaves a developer's editor, it gets transpiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
2. The JS engine parses the code to an AST.
3. Then the engine converts that AST to a kind-of byte code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT compiler.
4. Finally, the JS VM executes the program.

## Chapter 2: Surveying JS

### 2.1 数据类型

如果在模板字符串里没有用到 `${}` ，最好使用 `"" ` or ` ''`

`typeof null` unfortunately returns `"object"` instead of the expected `"null"`.  `typeof` returns the specific `"function"` for functions, but not the expected `"array"` for arrays.

### 2.2 Declaring and Using Variables

`const`声明的值最好不要是对象，因为对象可以被改变，并不会报错

```js
const myBirthday = true;
let age = 39;
if (myBirthday) {
    age = age + 1;    // OK!
    myBirthday = false;  // Error!
}

const actors = [
    "Morgan Freeman", "Jennifer Aniston"
];
actors[2] = "Tom Cruise";   // OK :(
actors = [];                // Error!
```

error对象的作用域在catch内

```js
try {
    someError();
}
catch (err) {
    console.log(err);
}
```

### 2.3 Equal

`==`支持类型转换

```js
NaN === NaN;            // false，Number.isNaN(..)代替
0 === -0;               // true
```

### 2.4 class and module

class

- 继承 
- 多态

module

- 在ES6之前，函数是实现模块化（工厂模式）的关键

- The key hallmarks of a *classic module* are an outer function (that runs at least once), which returns an "instance" of the module with one or more functions exposed that can operate on the module instance's internal (hidden) data.

两者区别

- class通过new把数据和方法存储在新建的实例上，类通过this构建联系；module通过作用域，构建闭包，返回实例

- The `class` form stores methods and data on an object instance, which must be accessed with the `this.` prefix. With modules, the methods and data are accessed as identifier variables in scope, without any `this.` prefix.
- class的数据和方法是共用的，module的数据和方法独立的

- With `class`, the "API" of an instance is implicit in the class definition—also, all data and methods are public. With the module factory function, you explicitly create and return an object with any publicly exposed methods, and any data or other unreferenced methods remain private inside the factory function.

ES Modules（ES6模块）

基于文件而不是函数，通过导入创建实例

Consider the file `publication.js`:

```js
function printDetails(title,author,pubDate) {
    console.log(`
        Title: ${ title }
        By: ${ author }
        ${ pubDate }
    `);
}

export function create(title,author,pubDate) {
    var publicAPI = {
        print() {
            printDetails(title,author,pubDate);
        }
    };

    return publicAPI;
}
```

To import and use this module, from another ES module like `blogpost.js`:

```js
import { create as createPub } from "publication.js";

function printDetails(pub,URL) {
    pub.print();
    console.log(URL);
}

export function create(title,author,pubDate,URL) {
    var pub = createPub(title,author,pubDate);

    var publicAPI = {
        print() {
            printDetails(pub,URL);
        }
    };

    return publicAPI;
}
```

And finally, to use this module, we import into another ES module like `main.js`:

```js
import { create as newBlogPost } from "blogpost.js";

var forAgainstLet = newBlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```