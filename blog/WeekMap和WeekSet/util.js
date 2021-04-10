function printHeap (msg) {
  const {
    rss,
    heapTotal,
    heapUsed,
    external,
    arrayBuffers
  } = process.memoryUsage()
  console.log(
    `=============${msg}===========================
     rss: ${~~(rss / 1024 / 1024)}M
     heapTotal: ${~~(heapTotal / 1024 / 1024)}M
     heapUsed: ${~~(heapUsed / 1024 / 1024)}M
     external:${~~(external / 1024 / 1024)}M
     arrayBuffers:${~~(arrayBuffers / 1024 / 1024)}M`
  )
}

module.exports = { printHeap }
