
let {head, ...tail} = {tail: 'tail', a: 'a', b: 'b', c: 'c', head: 'head'}; 

console.log(tail, head); // { tail: 'tail', a: 'a', b: 'b', c: 'c' } head