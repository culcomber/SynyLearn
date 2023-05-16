function f<T>(a: T, b: T) {
    if (typeof a === 'string') {
      return a + ':' + b; // no error but b can be number!
    } else {
      return (a as number) + (b as number); // error as b can be number | string
    }
  }
  
  f(2, 3); // Ok
  f(1, 'a'); // Error
  f('a', 2); // Error
  f(2, 2) // Ok