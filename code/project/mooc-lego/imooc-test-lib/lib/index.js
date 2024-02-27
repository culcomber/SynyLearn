module.exports = {
  sam(a, b) {
    return a + b;
  },
  init({option, param}) {
    console.log('init',option, param);
  }
}