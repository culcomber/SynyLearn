## 1、本地项目与远程仓库

[参考](https://cloud.tencent.com/developer/article/1504684)

**1.1 本地与 `github` 建立连接**

```shell
# 设置用户名和邮箱
$ git config --global user.name "这里是你github的用户名" 
$ git config --global user.email 这里是你注册github的邮箱

# 创建 SSH KEY
$ ssh-keygen -t rsa -C "youremail@example.com"
```

![img](../../assets/yht9kl3j69.png)

登录 `Github`,找到右上角的图标，打开点进里面的 `Settings`，再选中里面的 `SSH and GPG KEYS`，点击右上角的 `New SSH key`，然后 `Title` 里面随便填，再把刚才 `id_rsa.pub` 里面的内容复制到 `Title`  下面的 `Key`  内容框里面，最后点击 `Add SSH key`，这样就完成了 `SSH Key` 的加密。

**1.2 `github` 新建项目**

```shell
# 新建项目后直接clone到本地
$ git clone 
```

**1.3 本地新建项目**

```shell
# 新建本地项目
$ git init
# 在GitHub上面新建项目，然后本地仓库与远程仓库建立连接
$ git remote add origin https://github.com/guyibang/TEST2.git
```

## 2、创建 `React + Webpack 5` 工程

2.1 创建 `JS` 项目

```shell
# 创建并初始化项目
mkdir my-project
cd my-project
npm init -y
mkdir src
cd src
touch index.js
# npm配置
npm config list
npm set init-author-name "<Your Name>"
npm set init-author-email "you@example.com"
npm set init-author-url "https://example.com"
npm set init-license "MIT"
# 运行项目
node src/index.js

# package.json 配置命令
# "scripts": {
#     "start": "node src/index.js"
# },
```

2.2 `Backend Setup`

**使用 `Nodemon` 实现*热更新***

每次修改源代码时，都必须重新启动脚本。`nodemon` 将监视启动目录中的文件，如果有任何文件更改，`nodemon`将自动重新启动`node`应用程序。

```shell
npm install nodemon --save-dev

# package.json 配置命令
# "scripts": {
#     "start": "nodemon src/index.js"
# },
```

**配置 `Node` 项目** 

`Babel` 能在项目中使用 `Node.js` 中尚未引入 `JavaScript` 最新语言功能。

```shell
npm install @babel/core @babel/node --save-dev
npm install @babel/preset-env --save-dev
# package.json 配置命令
# "scripts": {
# 	  "start": "nodemon --exec babel-node src/index.js",
# },

touch .babelrc
# {
#   "presets": [
#     "@babel/preset-env"
#   ]
# }

npm install dotenv --save
touch .env
# MY_SECRET=mysupersecretpassword

# index.js
# import 'dotenv/config';
# console.log('Hello Node.js project.');
# console.log(process.env.MY_SECRET);
```



参考：[The minimal Node.js with Babel Setup](https://www.robinwieruch.de/minimal-node-js-babel-setup/)

2.3 `Frontend Setup`

- Part 2: [How to set up Webpack 5](https://www.robinwieruch.de/webpack-setup-tutorial/)
- Part 3: [How to set up Webpack 5 with Babel](https://www.robinwieruch.de/webpack-babel-setup-tutorial/)



2.4 `Fullstack Setup`

- Part 2: [TypeScript with Node.js](https://www.robinwieruch.de/typescript-node/)
- Part 3: [Fullstack TypeScript with tRPC and React](https://www.robinwieruch.de/react-trpc/)

