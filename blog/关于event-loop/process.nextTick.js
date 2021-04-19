const fs = require('fs')

setTimeout(() => {
  console.log('timeout callback')
  process.nextTick(function () {
    console.log('timeout tick')
  })
}, 0)

setImmediate(function () {
  console.log('immediate callback')
  process.nextTick(function () {
    console.log('immediate tick')
  })
})

const readStream = fs.createReadStream(
  __dirname + '/不要混淆nodejs和浏览器中的event loop.md'
)
readStream.close()
readStream.on('close', function () {
  console.log('close callback')
  process.nextTick(function(){
    console.log('close callback tick')
  })
})

fs.open('', 1, function () {
  console.log('open empty callback')
  process.nextTick(function () {
    console.log('open empty tick')
  })
})
