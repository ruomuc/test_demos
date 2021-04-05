// function loggingIdentity<T> (arg: T): T {
//   console.log(arg.length) // Error: T doesn't have .length
//   return arg
// }
function loggingIdentity(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity({ length: 3, value: 111 });
loggingIdentity([1, 23, 4, 11]);
