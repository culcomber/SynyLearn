#!/usr/bin/env node

const lib = require('imooc-test-lib-sam');
const argv = require('process').argv;
// console.log(argv);
/*$ imooc-test init --name vue-test
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\Web\\nodejs\\node_global\\node_modules\\imooc-test-sam\\bin\\index.js',
  'init',
  '--name',
  'vue-test'
]*/

// 获取命令行参数
const command = argv[2]; // init or --version
const options = argv.slice(3);

// 解析 imooc-test init --name vue-test
if (options.length > 1) {
  const [option, param] = options; // 数组的解构赋值
  if (command) {
    if (lib[command]) {
      lib[command]({option, param});
    } else {
      console.log('无效的命令');
    }
  } else {
    console.log('请输入命令');
  }
}

// 解析全局命令 imooc-test --version
if (command.startsWith('-')) {
  const globalOption = command.replace(/-|--/g, '');
  if (globalOption === 'version' || globalOption === 'V') {
    console.log('1.0.0');
  }
}

