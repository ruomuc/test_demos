var obj3 = {}
Object.defineProperty(Object.prototype, 'foo', {
  writable: false,
  value: 333
})
obj3.foo = 'i am obj3 foo'
console.log(obj3.foo) // 333
console.log(Object.prototype.foo) // 333
