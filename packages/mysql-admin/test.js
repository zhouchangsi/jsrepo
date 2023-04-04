function f(params) {
    return new Promise((resolve, reject) => {
        let err = true
        let msg = "w"
        let result = "hello"
        if (err) {
            let obj = {
                err: err,
                msg: msg,
            }
            resolve(obj)
        }
        resolve(result)
    })
}

async function f2() {
    let res = await f()
    if (res.err) {
        console.log(res.msg);
    }
    console.log(res);
}
f2()