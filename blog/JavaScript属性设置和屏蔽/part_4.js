'use strict'
var obj3 = {}
Object.defineProperty(Object.prototype, 'foo', {
  set: function () {
    console.log('i am a setter!')
  }
})
obj3.foo = 'i am obj3 foo'
console.log(obj3.foo)
console.log(Object.prototype.foo)
