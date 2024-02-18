## 1、类型断言

1.1 简介



类型断言的条件



1.2 `as const`断言



1.3 非空断言



1.4 断言函数



## 2、`TypeScript` 模块

2.1 简介



2.2 import type 语句



2.3 `importsNotUsedAsValues` 编译设置



2.4 `CommonJS` 模块

A `import =` 语句



B `export =` 语句



2.5 模块定位

A 相对模块，非相对模块



B Classic 方法



C Node 方法



D 路径映射



E `tsc` 的`--traceResolution`参数



F `tsc` 的`--noResolve`参数



## 3、`namespace`

3.1 基本用法



3.2 `namespace` 的输出



3.3 `namespace`的合并



## 4、装饰器

简介



装饰器的版本



装饰器的结构



类装饰器



方法装饰器



属性装饰器



`getter` 装饰器，`setter` 装饰器



`accessor` 装饰器



装饰器的执行顺序

## 5、declare 关键字

简介



`declare variable`



`declare function`



`declare class`



`declare module`，`declare namespace`



`declare global`



`declare enum`



`declare module` 用于类型声明文件



## 6、`d.ts` 类型声明文件

6.1 简介



6.2 类型声明文件的来源

A 自动生成



B 内置声明文件



C 外部类型声明文件



6.3 declare 关键字



6.4 模块发布



6.5 三斜杠命令
A `/// <reference path="" />`



B `/// <reference types="" />`



C `/// <reference lib="" />`



## 7、类型运算符

7.1 `keyof` 运算符



7.2 in 运算符



7.3 方括号运算符



7.4 extends...?: 条件运算符



7.5 infer 关键字



7.6 is 运算符



7.7 模板字符串



7.8 satisfies 运算符



## 8、类型映射

8.1 简介



8.2 映射修饰符



8.3 键名重映射

A 语法



B 属性过滤



C 联合类型的映射



## 9、注释指令

9.1 `// @ts-nocheck`



9.2 `// @ts-check`



9.3 `// @ts-ignore`



9.4 `// @ts-expect-error`



9.5 `JSDoc`
A `@typedef`



B `@type`



C `@param`



D `@return`，`@returns`



E `@extends` 和类型修饰符



## 10、`tsconfig.json`

10.1 简介



10.2 `exclude`



10.3 `extends`



10.4 `files`



10.5 `include`



10.6 `references`



10.7 `compilerOptions`



11、`tsc` 命令行编译器
11.1 简介



11.2 命令行参数



