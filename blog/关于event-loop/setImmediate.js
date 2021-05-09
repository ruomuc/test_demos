setImmediate(function () {
  console.log('immediate callback')
})
setTimeout(function () {
  console.log('timeout callback')
}, 0)


