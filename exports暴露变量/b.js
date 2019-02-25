// var foo = 1;

var foo = { a: 1 }

module.exports.foo = foo;

setTimeout(() => {
    console.log(foo.a); //1
    console.log(exports.foo.a); //233
    console.log(module.exports.foo.a); //233
}, 1000);