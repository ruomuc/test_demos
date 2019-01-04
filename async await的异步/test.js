function a(tag) {
    return new Promise((resolve, reject) => {
        if (tag == 1) {
            resolve('normal return');
        } else {
            reject(new Error("requires promises as the param"));
        }
    })
}

async function b() {
    //--------------------1
    try {
        let temp = await a(0);
        console.log('temp:', temp);
        return new Promise((resolve, reject) => {
            if (temp) {
                resolve(temp);
            } else {
                resolve(null);
            }
        })
    } catch (e) {
        console.log('temp:', e);
    }
    // --------------------


    // --------------------2
    // let temp = await a(1);
    // console.log('temp:', temp);
    // --------------------
}
//分别注释上面的两个代码块运行，可以捕获到错误。

async function c() {
    let temp2 = await b();
    console.log('temp2:', temp2);
}
c();