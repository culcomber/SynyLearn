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