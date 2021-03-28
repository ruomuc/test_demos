interface Person {
  firstName: string
  lastName: string
}

class Student {
  fullName: string

  constructor (public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
  greeter (person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName
  }
}

class Monitor extends Student {}

let user = new Student('Jane', 'M.', 'User')
let monitor = new Monitor('Zm', 'a', 'b')
// console.log(user)
// console.log(monitor)
user.greeter = function (person: Person) {
  console.log('changed greeter')
  return '1'
}

console.log(user.greeter(user))
console.log(user.greeter(monitor))
