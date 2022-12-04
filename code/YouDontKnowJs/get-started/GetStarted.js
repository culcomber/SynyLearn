function getFoo () {
    return new Promise(function (resolve, reject){
        resolve('foo');
    });
}

const g = function* () {
    try {
        const foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
};

function run (generator) {
    const it = generator(); // 得到g迭代器

    function go(result) { // 参数是it
        // { value: Promise { 'foo' }, done: false }
        // { value: undefined, done: true }
        if (result.done) return result.value;

        return result.value.then(function (value) { // g还有yield就继续调用
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }

    go(it.next()); // 运行g
}

run(g);