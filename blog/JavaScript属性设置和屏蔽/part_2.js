var obj3 = {a:111}
Object.prototype.foo = 'i am prototype foo'
obj3.foo = 'i am obj3 foo'
console.log(obj3.foo) // i am obj3 foo
console.log(Object.prototype.foo) // i am prototype foo