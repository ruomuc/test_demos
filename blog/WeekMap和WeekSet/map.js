const { printHeap } = require('./util')
const map = new Map()

function testMap () {
  for (let i = 0; i < 1000000; i++) {
    const obj = { [`key_${i}`]: i }
    map.set(obj, i)
  }
}

printHeap('tesMap begin--')
testMap()
printHeap('tesMap end--')
map.clear()
global.gc()
printHeap('testMap clear--')
