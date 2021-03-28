interface Person {
  firstName: string
  lastName: string
}
interface Character {
  height: number
  weight: number
  hobby: string
}

class Student {
  fullName: string
  height: number
  weight: number
  hobby: string

  constructor (p: Person, c: Character) {
    this.fullName = `${p.firstName}${p.lastName}`
    this.height = c.height
    this.weight = c.weight
    this.hobby = c.hobby
  }
  greeter () {
    console.log(`Hello, ${this.fullName}`)
  }
  getWeight () {
    console.log(`${this.fullName}'s weight is ${this.weight}kg`)
  }
}

class Monitor extends Student {}

let user = new Student(
  { firstName: 'y', lastName: 'm' },
  { height: 160, weight: 55, hobby: 'cycling' }
)
let monitor = new Monitor(
  { firstName: 'Z', lastName: 'm' },
  { height: 180, weight: 68, hobby: 'drawing' }
)

user.greeter()
user.getWeight()
monitor.greeter()
