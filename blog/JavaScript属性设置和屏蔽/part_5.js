var obj = {}
Object.defineProperty(Object.prototype, 'foo1', {
  writable: false,
  value: 'Object.prototype.foo1'
})
Object.defineProperty(obj, 'foo1', {
  value: 'obj.foo1'
})
console.log(obj.foo1)
console.log(Object.prototype.foo1)

var obj2 = {}
Object.defineProperty(Object.prototype, 'foo2', {
  set: function () {
    console.log('i am foo2 setter')
  },
  get: function () {
    return 'get foo2 success!'
  }
})
Object.defineProperty(obj2, 'foo2', {
  value: 'obj.foo2'
})
console.log(obj2.foo2)
console.log(Object.prototype.foo2)
