interface GenericIdentityFn<T> {
  (arg: T): T
}

function identify<T> (arg: T): T {
  return arg
}

// 这里锁定了 number
let myIdentify: GenericIdentityFn<number> = identify

console.log(typeof myIdentify(1))
console.log(typeof myIdentify('aaa')) // Argument of type 'string' is not assignable to parameter of type 'number'.
