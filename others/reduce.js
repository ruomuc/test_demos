function reduce(arr, cb, initial = null) {
    function iterator(res, vals, index) {
        if (vals.length == 1) return cb(res, vals[0], index)

        return cb(res, vals[0], index).then((n) => iterator(n, vals.slice(1), index + 1))
    }

    if (initial) {
        return iterator(initial, arr, 1)
    } else {
        return iterator(arr[0], arr.slice(1), 0)
    }
}

// 测试用例
function cb(res, i, index) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(res + i)
        }, 1000)
    })
}

console.log(reduce([1, 2, 3, 4, 5], cb))
console.log(reduce([1, 2, 3, 4, 5], cb, 10))


// // 模拟异步加法
// const asyncPlus = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve.bind(this, a + b), 1000);
//     });
// }

// const getTotal = [1, 2, 3, 4].reduce((accumulator, currentValue) => {
//     return Promise.resolve(accumulator).then((result) => {
//         return asyncPlus(result, currentValue);
//     });
// });

// getTotal.then((total) => {
//     console.log(total);
// });