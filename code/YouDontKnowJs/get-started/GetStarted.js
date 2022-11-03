var topic = 'globe'; // const声明，浏览器不会保存到全局对象里面

function classroom(teacher) {
    const topic = 'classroom';
    return function study() {
        console.log(
            `${ teacher } says to study ${ this.topic }`
        );
    };
}

(classroom("Kyle"))(); // 浏览器: Kyle says to study globe node：Kyle says to study undefined

var assignment = classroom("Kyle");
var homework = {
    topic: "JS",
    assignment: assignment
};
homework.assignment(); // Kyle says to study JS
