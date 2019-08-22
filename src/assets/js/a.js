module.exports = 'ssw';
class B {
  constructor() {
    this.b = 2;
  }
}
// function * gen() {
//   yield 1;
//   yield b = new B();
// }
// const c = gen().next();
// console.log(c);
const d = new B();
console.log(d.b);
// console.log(gen().next());