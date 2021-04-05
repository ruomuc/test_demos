// function loggingIdentify<T> (arg: T): T {
//   console.log(arg.length) // Property 'length' does not exist on type 'T'.
// }

// loggingIdentify([1, 2, 3])

// 泛型数组
function loggingIdentify<T> (arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

loggingIdentify([1, 2, 3])
