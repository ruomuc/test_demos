const fs = require('fs')
function nextTick () {
  process.nextTick(function () {
    nextTick()
  })
}
nextTick()
fs.open('', 1, function () {
  console.log('====永远都不会轮到我====')
})
