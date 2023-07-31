let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
counter1.increment();
const counter2 = new Counter();
counter2.increment();

console.log(counter1.getCount(), counter2.getCount()); // false