/**************** 计算乘积 *****************/
var mult = function(){ // 负责纯粹计算
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
};
/**************** 计算加和 *****************/
var plus = function(){
  var a = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a + arguments[i];
  }
  return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function( fn ){ // 增加缓存逻辑
  var cache = {};
  console.log('cache wai', cache)
  return function(){
    console.log('cache', cache)
    var args = Array.prototype.join.call( arguments, ',' ); // 1, 2, 3, 4
    if ( args in cache ){
      return cache[ args ];
    }
    return cache[ args ] = fn.apply( this, arguments );
  }
};
var proxyMult = createProxyFactory( mult ),
  proxyPlus = createProxyFactory( plus );

console.log( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
console.log( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
console.log( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
console.log( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10