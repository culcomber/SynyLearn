/* 装饰者模式和代理模式
代理模式通常只有一层代理对本体的引用，而装饰者模式经常会形成一条长长的装饰链。
装饰者模式是实实在在的为对象增加新的职责和行为，而代理做的事情还是跟本体一样，最终都是设置 src。
但代理可以加入一些“聪明”的功能，比如在图片真正加载好之前，先使用一张占位的 loading 图片反馈给客户。*/

// 一开始这些飞机只能发射普通的子弹，升到第二级时可以发射导弹，升到第三级时可以发射原子弹。
const Plane = function(){}
Plane.prototype.fire = function(){
    console.log( '发射普通子弹' );
}
// 接下来增加两个装饰类，分别是导弹和原子弹：
const MissileDecorator = function( plane ){
    this.plane = plane;
}
MissileDecorator.prototype.fire = function(){
    this.plane.fire(); // 保留之前的方法
    console.log( '发射导弹' );
}
const AtomDecorator = function( plane ){
    this.plane = plane;
}
AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log( '发射原子弹' );
}
let plane = new Plane();
plane = new MissileDecorator( plane );
plane = new AtomDecorator( plane );
plane.fire(); // 分别输出： 发射普通子弹、发射导弹、发射原子弹

// 用 AOP 装饰函数
Function.prototype.before = function( beforefn ){ // 返回函数
    const __self = this; // 保存原函数的引用，function(){console.log(1);}
    return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
        // 也会被原封不动地传入原函数，新函数在原函数之前执行
        return __self.apply( this, arguments ); // 执行原函数并返回原函数的执行结果，
        // 并且保证 this 不被劫持
    }
}
Function.prototype.after = function( afterfn ){ // 返回函数
    const __self = this; // function(){ function(){console.log(2);}.apply( this, arguments );...}
    return function(){
        const ret = __self.apply( this, arguments ); // 运行before=beforefn+origin
        afterfn.apply( this, arguments ); // 运行afterfn
        return ret;
    }
};
const test = function(origin){
    console.log(2, origin);
}.before(function(before){
    console.log(1, before);
}, 'before').after(function(after){
    console.log(3, after);
}, 'after');
test('origin');

// 用AOP动态改变函数的参数
const getToken = function(){
    return 'Token';
}
ajax = ajax.before(function( type, url, param ){
    param.Token = getToken(); // 给param增加参数
});
ajax( 'get', 'http://xxx.com/userinfo', { name: 'sven' } );

// 用AOP验证表单
/*<body>
 用户名：<input id="username" type="text"/>
 密码： <input id="password" type="password"/>
 <input id="submitBtn" type="button" value="提交">
</body>*/
const username = document.getElementById( 'username' ),
    password = document.getElementById( 'password' ),
    submitBtn = document.getElementById( 'submitBtn' );
Function.prototype.before = function( beforefn ){
    const __self = this;
    return function(){
        if ( beforefn.apply( this, arguments ) === false ){
            // beforefn 返回 false 的情况直接 return，不再执行后面的原函数
            return;
        }
        return __self.apply( this, arguments );
    }
}
const validate = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}
let formSubmit = function(){
    const param = {
        username: username.value,
        password: password.value
    }
    ajax( 'http://xxx.com/login', param );
}
// 把校验规则动态接在 formSubmit 函数之前，validate 成为一个即插即用的函数
formSubmit = formSubmit.before( validate ); // .before返回函数
submitBtn.onclick = function(){
    formSubmit(); // 运行.before函数
}