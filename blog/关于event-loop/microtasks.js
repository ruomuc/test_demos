const fs = require('fs')

process.nextTick(function () {
  console.log('nextTick')
  new Promise(function (resolve) {
    resolve()
  }).then(function () {
    console.log('microtasks2')
  })
})

new Promise(function (resolve) {
  resolve()
}).then(function () {
  console.log('microtasks')
})

process.nextTick(function () {
  console.log('nextTick2')
  new Promise(function (resolve) {
    resolve()
  }).then(function () {
    console.log('microtasks3')
  })
})
fs.open('', 1, function () {
  console.log('====我是分界线====')
})