const fs = require('fs')
function runMicrotask(){
  new Promise(function (resolve) {
    resolve()
  }).then(function () {
    runMicrotask()
  })
}
runMicrotask()

fs.open('', 1, function () {
  console.log('====永远都不会轮到我====')
})
