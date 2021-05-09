const { Socket } = require('dgram')

const fs = require('fs')

const readStream = fs.createReadStream(
  __dirname + '/不要混淆nodejs和浏览器中的event loop.md'
)
readStream.close()
readStream.on('close', function () {
  console.log('close callback')
})

setImmediate(function () {
  console.log('immediate callback')
})
