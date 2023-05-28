// 自定义事件
const salesOffices = {}; // 定义售楼处
salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function( key, fn ){
    if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
};
salesOffices.trigger = function(){ // 发布消息
    const key = Array.prototype.shift.call( arguments ), // 取出消息类型
        fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
    if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
        return false;
    }
    for( let i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
    }
};
salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅 88 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 2000000 
});
salesOffices.listen( 'squareMeter110', function( price ){ // 小红订阅 110 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 3000000 
});
salesOffices.trigger( 'squareMeter88', 2000000 ); // 发布 88 平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 ); // 发布 110 平

// 发布－订阅模式的通用实现
const event = {
    clientList: [],
    listen: function( key, fn ){
        if ( !this.clientList[ key ] ){
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
    },
    trigger: function(){
        const key = Array.prototype.shift.call( arguments ), // (1);
            fns = this.clientList[ key ];
        if ( !fns || fns.length === 0 ){ // 如果没有绑定对应的消息
            return false;
        }
        for( let i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments ); // (2) // arguments 是 trigger 时带上的参数
        }
    },
    remove: function( key, fn ){
        const fns = this.clientList[key];
        if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返回
            return false;
        }
        if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            for (let l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
                const _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    },
};
const installEvent = function( obj ){
    for ( const i in event ){
        obj[ i ] = event[ i ]; // 给salesOffices1添加clientList，listen，trigger属性
    }
};
const salesOffices1 = {};
installEvent( salesOffices1 );
// fn1 fn2挂载在全局对象 console.log(global);
salesOffices1.listen( 'squareMeter88', fn1 = function( price ){ // 小明订阅消息
    console.log( '小明价格= ' + price );
});
salesOffices1.listen( 'squareMeter88', fn2 = function( price ){ // 小蓝订阅消息
    console.log( '小蓝价格= ' + price );
});
salesOffices1.listen( 'squareMeter100', function( price ){ // 小红订阅消息
    console.log( '小红价格= ' + price );
});
// salesOffices1.remove( 'squareMeter88', fn2 ); // 删除小蓝的订阅
salesOffices1.trigger( 'squareMeter88', 2000000 );
salesOffices1.trigger( 'squareMeter100', 3000000 );

// 真实的例子——网站登录
// 登录模块只需要发布登录成功的消息，而业务方接受到消息之后，就会开始进行各自的业务处理
const login = {};
installEvent( login );
fetch( 'http://xxx.com?login').then(function(data){ // 登录成功
    login.trigger( 'loginSucc', data); // 发布登录成功的消息
});
// 各模块监听登录成功的消息：
const header = (function(){ // header 模块
    login.listen( 'loginSucc', function( data ){
        header.setAvatar( data );
    });
    return {
        setAvatar: function( data ){
            console.log( '设置 header 模块的头像' );
        }
     } 
})(); 
const nav = (function(){ // nav 模块
    login.listen( 'loginSucc', function( data ){
        nav.setAvatar( data );
    });
    return {
        setAvatar: function( avatar ){
            console.log( '设置 nav 模块的头像' );
        }
    }
})();
// 后续新增需要登陆信息的地址管理
const address = (function(){ // nav 模块
    login.listen( 'loginSucc', function( obj ){
        address.refresh( obj );
    });
    return {
        refresh: function( avatar ){
            console.log( '刷新收货地址列表' );
        }
    }
})();

// 全局的发布－订阅对象
// 通过中介实现对各个售楼部监听
event.listen( 'squareMeter88', function( price ){ // 小红订阅消息
    console.log( '价格= ' + price ); // 输出：'价格=2000000'
});
event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息

// 模块间通信
/*<body>
 <button id="count">点我</button>
 <div id="show"></div>
</body>*/
// 给b添加监听事件listen，a点击事件添加发布事件trigger
const a = (function(){
    let count = 0;
    let button = document.getElementById( 'count' );
    button.onclick = function(){
        event.trigger( 'add', count++ );
    }
})();
const b = (function(){
    let div = document.getElementById( 'show' );
    event.listen( 'add', function( count ){
        div.innerHTML = count;
    });
})();















