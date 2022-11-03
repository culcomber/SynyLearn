function range(start,end) {
    // 两个参数返回数组
    // 一个参数返回function，并且保留start
    let result = [];
    let endData;
    if (!Number.isNaN(Number(end))) {
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        console.log(result);
        return result;
    } else {
        console.log('return function')
        let startData = start;
        return function handleRange (endData) {
            let result = [];
            for (let i = startData; i <= endData; i++) {
                result.push(i);
            }
            console.log(result);
            return result;
        };
    }
}

range(3,3);    // [3]
range(3,8);    // [3,4,5,6,7,8]
range(3,0);    // []

var start3 = range(3);
var start4 = range(4);

start3(3);     // [3]
start3(8);     // [3,4,5,6,7,8]
start3(0);     // []

start4(6);     // [4,5,6]\

function range1(start,end) {
    start = Number(start) || 0;

    if (end === undefined) {
        return function getEnd(end) {
            // todo 参数不一样，函数外再包一层
            return getRange(start,end);
        };
    } else {
        end = Number(end) || 0;
        return getRange(start,end);
    }
    // **********************
    function getRange(start,end) {
        // todo 每次调用都生成新的数组
        var ret = [];
        for (let i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    }
}