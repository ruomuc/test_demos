var obj = {}
obj.a = 1
console.log(obj.a) // 1

var obj2 = {}
console.log(obj2.__proto__ === Object.prototype) // true
Object.prototype.a = 233
console.log(obj2.a) // 233