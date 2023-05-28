const calculateBonusOrigin = function( performanceLevel, salary ){
    if ( performanceLevel === 'S' ){
        return salary * 4;
    }
    if ( performanceLevel === 'A' ){
        return salary * 3;
    }
    if ( performanceLevel === 'B' ){
        return salary * 2;
    }
};
calculateBonusOrigin( 'B', 20000 ); // 输出：40000
calculateBonusOrigin( 'S', 6000 ); // 输出：24000

// 在函数作为一等对象的语言中，策略模式是隐形的。strategy 就是值为函数的变量。
const S = function( salary ){
    return salary * 4;
};
const A = function( salary ){
    return salary * 3;
};
const B = function( salary ){
    return salary * 2;
};
const calculateBonus1 = function( func, salary ){
    return func( salary );
};
calculateBonus1( S, 10000 ); // 输出：40000

// 算法被封装在策略类内部的方法里
const performanceS = function(){};
performanceS.prototype.calculate = function( salary ){
    return salary * 4;
};

const performanceA = function(){};
performanceA.prototype.calculate = function( salary ){
    return salary * 3;
};

const performanceB = function(){};
performanceB.prototype.calculate = function( salary ){
    return salary * 2;
};

const Bonus = function(){
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function( salary ){
    this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function( strategy ){
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){ // 取得奖金数额
    return this.strategy.calculate( this.salary ); // 把计算奖金的操作委托给对应的策略对象
};

const bonus = new Bonus();
bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：40000 
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：30000

// 函数也是对象，把 strategy直接定义为函数
const strategies = {
    "S": function( salary ){
        return salary * 4;
    },
    "A": function( salary ){
        return salary * 3;
    },
    "B": function( salary ){
        return salary * 2;
    }
};
// 用 calculateBonus 函数充当 Context 来接受用户的请求
// 消除了原程序中大片的条件分支语句，所有跟计算奖金有关的逻辑不再放在 Context 中，而是分布在各个策略对象中
const calculateBonus = function( level, salary ){
    return strategies[ level ]( salary ); // 把职责委托给了某个策略对象
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000 
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000

// 表单校验
/*<form action="http:// xxx.com/register" id="registerForm" method="post">
 请输入用户名：<input type="text" name="userName"/ >
 请输入密码：<input type="text" name="password"/ >
 请输入手机号码：<input type="text" name="phoneNumber"/ >
 <button>提交</button>
 </form>*/
const registerFormOrigin = document.getElementById( 'registerForm' );
registerFormOrigin.onsubmit = function(){
    if ( registerFormOrigin.userName.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    if ( registerFormOrigin.password.value.length < 6 ){
        alert ( '密码长度不能少于 6 位' );
        return false;
    }
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerFormOrigin.phoneNumber.value ) ){
        alert ( '手机号码格式不正确' );
        return false;
    }
}
// 使用策略模式
const strategies1 = {
    isNonEmpty: function( value, errorMsg ){ // 不为空
        if ( value === '' ){
            return errorMsg ;
        }
    },
    minLength: function( value, length, errorMsg ){ // 限制最小长度
        if ( value.length < length ){
            return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ){ // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
            return errorMsg;
        }
    }
}; // 策略对象

const registerForm = document.getElementById( 'registerForm' );
registerForm.onsubmit = function(){
    const errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
    if ( errorMsg ){
        alert ( errorMsg );
        return false; // 阻止表单提交
    }
};

const validataFunc = function(){
    // Validator 类在这里作为 Context，负责接收用户的请求并委托给 strategy 对象
    const validator = new Validator(); // 创建一个 validator 对象
    /***************添加一些校验规则****************/
    /*validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于 6 位' );
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );*/
    // 一个表单多个校验
    validator.add( registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于 10 位'
    }]);
    validator.add( registerForm.password, [{
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于 6 位'
    }]);
    validator.add( registerForm.phoneNumber, [{
        strategy: 'isMobile',
        errorMsg: '手机号码格式不正确'
    }]);
    let errorMsg = validator.start(); // 获得校验结果
    return errorMsg; // 返回校验结果
}
// Validator 类的实现
const Validator = function(){
    this.cache = []; // 保存校验规则
};
// validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
/*Validator.prototype.add = function( dom, rule, errorMsg ){
    const ary = rule.split( ':' ); // 把 strategy 和参数分开
    this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入 cache 
        const strategy = ary.shift(); // 用户挑选的 strategy 
        ary.unshift( dom.value ); // 把 input 的 value 添加进参数列表
        ary.push( errorMsg ); // 把 errorMsg 添加进参数列表
        return strategies1[ strategy ].apply( dom, ary );
    });
};*/
/*validator.add( registerForm.userName, [{strategy: 'isNonEmpty',errorMsg: '用户名不能为空'},
{strategy: 'minLength:6',errorMsg: '用户名长度不能小于 10 位'}]);*/
Validator.prototype.add = function( dom, rules ){
    const self = this;
    for ( let i = 0, rule; rule = rules[ i++ ]; ){
        (function( rule ){
            let strategyAry = rule.strategy.split( ':' );
            const errorMsg = rule.errorMsg;
            self.cache.push(function(){
                const strategy = strategyAry.shift();
                strategyAry.unshift( dom.value );
                strategyAry.push( errorMsg );
                return strategies[ strategy ].apply( dom, strategyAry );
            });
        })( rule )
    }
};
Validator.prototype.start = function(){
    for ( let i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
        const msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
        if ( msg ){ // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};