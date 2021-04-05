
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
