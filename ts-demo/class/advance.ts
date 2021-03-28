class Greeter {
  static standardGreeting = 'Hello, there'
  greeting: string
  greet () {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()

console.log(greeter.greet())

// let greeter1 = new greeter()
// console.log(greeter1.greet())
let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there!'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())
