async function takeAsync(asyncIterable, count = Infinity) {
    const result = [];
    const iterator = asyncIterable[Symbol.asyncIterator]();
    while (result.length < count) { // 遍历gen
        const {value, done} = await iterator.next();
        if (done) break;
        result.push(value);
    }
    return result; // ['a', 'b', 'c']
}
async function f() {
    async function* gen() {
        yield 'a';
        yield 'b';
        yield 'c';
    }
    return await takeAsync(gen());
}
f().then(function (result) {
    console.log(result); // ['a', 'b', 'c']
})