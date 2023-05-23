// A 的朋友 B 却很了解 A，所以小明只管把花交给 B，B 会监听 A 的心情变化，然后选择 A 心情好的时候把花转交给 A
const Flower = function () {};
const xiaoming = {
    sendFlower: function( target){
        // var flower = new Flower();
        target.receiveFlower( flower );
    }
};
const B = {
    receiveFlower: function( flower ){
        A.listenGoodMood(function(){ // 监听 A 的好心情
            const flower = new Flower(); // 延迟创建 flower 对象
            A.receiveFlower( flower );
        });
    }
};
const A = {
    receiveFlower: function( flower ){
        console.log( '收到花 ' + flower );
    },
    listenGoodMood: function( fn ){
        setTimeout(function(){ // 假设 10 秒之后 A 的心情变好
            fn();
        }, 10000 );
    }
};
xiaoming.sendFlower( B );

// 虚拟代理实现图片预加载，通过 proxyImage 间接地访问 MyImage
// 给 img 节点设置 src 和图片预加载这两个功能，被隔离在两个对象里，它们可以各自变化而不影响对方
const myImage = (function(){
    const imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();
const proxyImage = (function(){
    const img = new Image;
    img.onload = function(){ // 图片加载完成
        myImage.setSrc( this.src );
    }
    return {
        setSrc: function( src ){
            myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
            img.src = src;
        }
    }
})();
proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

// 虚拟代理合并 HTTP 请求
// 通过一个代理函数 proxySynchronousFile 来收集一段时间之内的请求，最后一次性发送给服务器
// 如果不是对实时性要求非常高的系统，2 秒的延迟不会带来太大副作用，却能大大减轻服务器的压力
/*<body>
 <input type="checkbox" id="1"></input>1
 <input type="checkbox" id="2"></input>2
 ...
</body>*/
const synchronousFile = function( id ){
    console.log( '开始同步文件，id 为: ' + id );
};
const proxySynchronousFile = (function(){
    let cache = [], // 保存一段时间内需要同步的 ID
        timer; // 定时器
    return function( id ){
        cache.push( id );
        if ( timer ){ // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function(){
            // ['Fire', 'Air', 'Water']-->"Fire,Air,Water"
            synchronousFile( cache.join( ',' ) ); // 2 秒后向本体发送需要同步的 ID 集合
            clearTimeout( timer ); // 清空定时器
            timer = null;
            cache.length = 0; // 清空 ID 集合
        }, 2000 );
    }
})();
const checkbox = document.getElementsByTagName( 'input' );
for ( let i = 0, c; c = checkbox[ i++ ]; ){
    c.onclick = function(){
        if ( this.checked === true ){
            proxySynchronousFile( this.id );
        }
    }
}

// 虚拟代理在惰性加载中的应用
const miniConsole = (function(){
    const cache = [];
    const handler = function( ev ){
        if ( ev.keyCode === 113 ){
            let script = document.createElement( 'script' );
            script.onload = function(){
                for ( let i = 0, fn; fn = cache[ i++ ]; ){ // fn-->function(){miniConsole}
                    fn();
                }
            };
            script.src = 'miniConsole.js';
            document.getElementsByTagName( 'head' )[0].appendChild( script );
            document.body.removeEventListener( 'keydown', handler );// 只加载一次 miniConsole.js
        }
    };
    document.body.addEventListener( 'keydown', handler, false );
    return {
        log: function(){
            const args = arguments; // 11
            cache.push( function(){
                return miniConsole.log.apply( miniConsole, args );
            });
        }
    }
})();
miniConsole.log( 11 ); // 开始打印 log
miniConsole.log( 22 ); // 开始打印 log

// 缓存代理
/**************** 计算乘积 *****************/
const mult = function(){
    console.log( '开始计算乘积' );
    let a = 1;
    for ( let i = 0, l = arguments.length; i < l; i++ ){
        a = a * arguments[i];
    }
    return a;
};
mult( 2, 3 ); // 输出：6
mult( 2, 3, 4 ); // 输出：24
// 现在加入缓存代理函数：
const proxyMult = (function(){
    const cache = {};
    return function(){
        const args = Array.prototype.join.call( arguments, ',' );
        if ( args in cache ){
            return cache[ args ];
        }
        return cache[ args ] = mult.apply( this, arguments );
    }
})();
proxyMult( 1, 2, 3, 4 ); // 输出：24
proxyMult( 1, 2, 3, 4 ); // 输出：24

/**************** 计算加和 *****************/
const plus = function(){
    let a = 0;
    for ( let i = 0, l = arguments.length; i < l; i++ ){
        a = a + arguments[i];
    }
    return a;
};
/**************** 创建缓存代理的工厂 *****************/
// 过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理
const createProxyFactory = function( fn ){
    let cache = {};
    return function(){
        let args = Array.prototype.join.call( arguments, ',' );
        if ( args in cache ){
            return cache[ args ];
        }
        return cache[ args ] = fn.apply( this, arguments );
    }
};
const proxyMult1 = createProxyFactory( mult ),
    proxyPlus = createProxyFactory( plus );
alert ( proxyMult1( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyMult1( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
