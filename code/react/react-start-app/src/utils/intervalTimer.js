export default function intervalTimer(callback, interval = 500) {
    let counter = 1;
    let timeoutId;
    const startTime = Date.now();

    function main() {
        const nowTime = Date.now();
        const nextTime = startTime + counter * interval;
        timeoutId = setTimeout(main, interval - (nowTime - nextTime));

        console.log('deviation', nowTime - nextTime);

        counter += 1;
        callback();
        /*if (value > 0) {
            value -= 1;
        } else {
            cancelTimer();
        }*/
    }

    timeoutId = setTimeout(main, interval);

    /*return () => {
        clearTimeout(timeoutId);
    };*/
    return timeoutId;
}

/*let value = 5;
const cancelTimer = intervalTimer(() => {
    if (value > 0) {
        value -= 1;
    } else {
        cancelTimer();
    }
}, 1000); // 执行函数后变成，执行后就会销毁*/
/*() => {
    clearTimeout(timeoutId);
};*/

// 上面等同于
/*
const clearOut = intervalTimer(() => console.log('hello'), 500);
let value1 = 5;
if (value1 > 0) {
    value1 -= 1;
} else {
    clearOut();
}*/
