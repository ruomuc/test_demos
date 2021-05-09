const time = 1000

setTimeout(() => {
  console.log('timeout1')
}, time)

const interval1 = setInterval(() => {
  console.log('interval1')
  clearInterval(interval1)
}, time)

setTimeout(() => {
  console.log('timeout2')
}, time)

const interval2 = setInterval(() => {
  console.log('interval2')
  clearInterval(interval2)
}, time)


