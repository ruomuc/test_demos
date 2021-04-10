const { printHeap } = require('./util')
const wkMap = new WeakMap()

function testWeekMap () {
  for (let i = 0; i < 1000000; i++) {
    const obj = { [`key_${i}`]: null }
    wkMap.set(obj, i)
  }
}

printHeap('tesWeekMap begin--')
testWeekMap()
printHeap('tesWeekMap end--')
global.gc()
printHeap('tesWeekMap clear--')
