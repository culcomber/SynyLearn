// 伪类 Pseudoclassical
Function.method('new', function ( ) {
    var that = Object.create(this.prototype);     // 创建一个新对象，它继承自构造器函数的原型对象。
    var other = this.apply(that, arguments); // 调用构造器函数，绑定 -this- 到新对象上。
    return (typeof other === 'object' && other) || that; // 如果它的返回值不是一个对象，就返回该新对象。
});
// 定义一个构造器并扩充它的原型：
var Mammal = function (name) {
    this.name = name;
};
Mammal.prototype.get_name = function ( ) {
    return this.name;
};
Mammal.prototype.says = function ( ) {
    return this.saying || '';
};
// 构造一个实例，调用构造器函数时忘记了在前面加上new前缀，那么this将不会被绑定到一个新对象上
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name( ); // 'Herb the Mammal'

// 原型 Prototypal
var myMammal = {
    name : 'Herb the Mammal',
    get_name : function ( ) {
        return this.name;
    },
    says : function ( ) {
        return this.saying || '';
    }
};
// 使用create创建实例，
var myCat1 = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';

// 函数化 Functional
/*1．创建一个新对象。可以构造一个对象字面量，或者可以和new前缀连用去调用一个构造器函数，
或者可以使用Object.create方法去构造一个已经存在的对象的新实例，或者它可以调用任意一个会返回一个对象的函数。
2．有选择地定义私有实例变量和方法。这些就是函数中通过var语句定义的普通变量。
3．给这个新对象扩充方法。这些方法拥有特权去访问参数，以及在第2步中通过var语句定义的变量。
4．返回那个新对象。
*/
var mammal = function (spec) {
    var that = {};
    that.get_name = function ( ) {
        return spec.name;
    };
    that.says = function ( ) {
        return spec.saying || '';
    };
    return that;
};
var myMammal1 = mammal({name: 'Herb'});

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.get_name = function ( ) {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};
var myCat = cat({name: 'Henrietta'});

Object.method('superior', function (name) {
    var that = this, method = that[name];
    return function ( ) {
        return method.apply(that, arguments);
    };
});

var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior('get_name');
    that.get_name = function (n) {
        return 'like ' + super_get_name( ) + ' baby';
    };
    return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name1 = myCoolCat.get_name(); // 'like meow Bix meow baby'

// 部件 Parts
var eventuality = function (that) {
    var registry = {};
    that.fire = function (event) {
        //在一个对象上触发一个事件。该事件可以是一个包含事件名称的字符串，
        //或者是一个拥有包含事件名称的 type 属性的对象。
        //通过'on' 方法注册的事件处理程序中匹配事件名称的函数将被调用。
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;
        // 如果这个事件存在一组事件处理程序，那么就遍历它们并按顺序依次执行。
        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];
                // 每个处理程序包含一个方法和一组可选的参数。
                // 如果该方法是一个字符串形式的名字，那么寻找到该函数。
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }
                // 调用一个处理程序。如果该条目包含参数，那么传递它们过去。否则，传递该事件对象。
                func.apply(this,
                    handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function (type, method, parameters) {
        // 注册一个事件。构造一条处理程序条目。将它插入到处理程序数组中，
        // 如果这种类型的事件还不存在，就构造一个。
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};