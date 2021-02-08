
setInterval(() => {
    console.log('--------------------------')
    process.nextTick(function () {
        console.log('nextTick 0');
    });
    setImmediate(function () {
        console.log('setImmediate 1')
        process.nextTick(function () {
            console.log('nextTick 2');
        });
    })

    setTimeout(function () {
        console.log('setTimeout 1')
        process.nextTick(function () {
            console.log('nextTick 1');
        });
    }, 0)
}, 1000);

//下面的单独用来验证 setImmediate() 和 setTimeout(fn,0)的回调执行顺序

// setInterval(() => {
//     console.log('xxxxxxxxxxxxxxxxx');
//     setImmediate(() => {
//         console.log('immediate xxx');
//     })
//     setTimeout(() => {
//         console.log('timeout xxx');
//     }, 0);
    
// }, 1000);