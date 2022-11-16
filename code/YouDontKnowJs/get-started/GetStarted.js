const myObj = {
    favoriteNumber: 'function',
    hello: 'function'
}
const anotherObj = {
    favoriteNumber: 12,
    ...myObj,   // object spread, shallow copies `myObj`
    hello: 'world'
}
console.log(anotherObj); // { favoriteNumber: 'function', hello: 'world' }
