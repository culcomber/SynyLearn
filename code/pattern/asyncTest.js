console.log('start');

function start() {
  let runner = new Promise((resolve, reject) => {
    console.log('runner')
    let chain = Promise.resolve();
    chain = chain.then(() => runCommand());
  })
}

function runCommand() {
  console.log('runCommand')
  return Promise.resolve()
    // 初始化
    .then(() => initialize())
}

function initialize() {
  console.log('initialize')
  let chain = Promise.resolve();

  chain = chain.then(() => console.log('initialize chain'));

  return chain;
}

setTimeout(() => console.log('setTimeout'), 0);

start();