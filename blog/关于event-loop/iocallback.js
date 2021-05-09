const fs = require('fs')

setImmediate(() => {
  console.log('immediate callback')
})
fs.open('', 1, function () {
  console.log('open empty callback')
})

fs.open('./不要混淆nodejs和浏览器中的event loop', 1, function () {
  console.log('open file callback')
})
