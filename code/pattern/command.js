/*<body>
 <button id="button1">点击按钮 1</button>
 <button id="button2">点击按钮 2</button>
 <button id="button3">点击按钮 3</button>
</body>*/
const button1 = document.getElementById( 'button1' );
const button2 = document.getElementById( 'button2' );
const button3 = document.getElementById( 'button3' );
// setCommand 函数负责往按钮上面安装命令
// 执行命令的动作被约定为调用 command 对象的 execute()方法
const setCommand = function( button, command ){
    button.onclick = function(){
        command.execute();
    }
};
// 具体行为
const MenuBar = {
    refresh: function(){
        console.log( '刷新菜单目录' );
    }
};
const SubMenu = {
    add: function(){
        console.log( '增加子菜单' );
    },
    del: function(){
        console.log( '删除子菜单' );
    }
};
// 把行为都封装在命令类
const RefreshMenuBarCommand = function( receiver ){
    this.receiver = receiver;
};
// 把MenuBar{refresh:fn}封装成refreshMenuBarCommand{execute:fn}，方便setCommand调用
RefreshMenuBarCommand.prototype.execute = function(){
    this.receiver.refresh();
};
const AddSubMenuCommand = function( receiver ){
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function(){
    this.receiver.add();
};
const DelSubMenuCommand = function( receiver ){
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function(){
    console.log( '删除子菜单' );
};
// 把命令接收者传入到 command 对象中，并且把 command 对象安装到 button 上
const refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar ); 
const addSubMenuCommand = new AddSubMenuCommand( SubMenu ); 
const delSubMenuCommand = new DelSubMenuCommand( SubMenu ); 
setCommand( button1, refreshMenuBarCommand ); 
setCommand( button2, addSubMenuCommand ); 
setCommand( button3, delSubMenuCommand );

// JavaScript 中的命令模式
const bindClick = function( button, func ){
    button.onclick = func;
};
bindClick( button1, MenuBar.refresh );
bindClick( button2, SubMenu.add );
bindClick( button3, SubMenu.del );

// 闭包实现的命令模式如下代码所示：
const RefreshMenuBarCommand2 = function( receiver ){
    return {
        execute: function() {
            receiver.refresh();
        }
    }
};
const refreshMenuBarCommand2 = RefreshMenuBarCommand2(MenuBar);
setCommand( button1, refreshMenuBarCommand2 );

// 播放录像的时候只需要从头开始依次执行这些命令
/*<body>
 <button id="replay">播放录像</button>
 </body>*/
const Ryu = {
    attack: function(){
        console.log( '攻击' );
    },
    defense: function(){
        console.log( '防御' );
    },
    jump: function(){
        console.log( '跳跃' );
    },
    crouch: function(){
        console.log( '蹲下' );
    }
};

const commands = { // 键盘映射命令
    "119": "jump", // W
    "115": "crouch", // S
    "97": "defense", // A
    "100": "attack" // D
};

const commandStack = []; // 保存命令的堆栈

const makeCommand = function( receiver, state ){ // 创建命令 receiver--Ryu state--attack
    return function(){ // 返回函数，函数里面运行命令
        receiver[ state ]();
    }
};

document.onkeypress = function( ev ){
    const keyCode = ev.keyCode,
        command = makeCommand( Ryu, commands[ keyCode ] );
    if ( command ){
        command(); // 执行命令
        commandStack.push( command ); // 将刚刚执行过的命令保存进堆栈
    }
};

document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像
    let command;
    while( command = commandStack.shift() ){ // 从堆栈里依次取出命令并执行
        command();
    }
};

// 宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令
// 宏命令是命令模式与组合模式的联用产物
// macroCommand.add 把子命令添加进宏命令对象，当调用宏命令对象的 execute 方法时，会迭代这一组子命令对象，并且依次执行它们的 execute 方法
const closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};
const openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};
const openQQCommand = {
    execute: function(){
        console.log( '登录 QQ' );
    }
};
const MacroCommand = function(){
    return {
        commandsList: [],
        add: function( command ){
            this.commandsList.push( command );
        },
        execute: function(){
            for ( let i = 0, command; command = this.commandsList[ i++ ]; ){
                command.execute();
            }
        }
    }
};
const macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );
macroCommand.execute();