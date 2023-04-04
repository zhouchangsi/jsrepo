const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_dorm"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("\n\nMySQL Connected!");
});

function querySQL(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                let errData = {
                    sql: sql,
                    message: err.sqlMessage
                }
                // console.log(errData)
                reject(errData)
            } else {
                // console.log("类型", typeof result, result)
                resolve(result)
            }
        })
    })
}

function queryByArr(sql, arr) {
    return new Promise((resolve, reject) => {
        con.query(sql, arr, (err, result) => {
            if (err) {
                let errData = {
                    sql: sql,
                    message: err.sqlMessage
                }
                reject(errData)
            } else {
                resolve(result)
            }
        })
    })
}

let self = this

module.exports.queryPage = function (prams) {
    let {tableName, pageSize, page} = prams
    let sql = `SELECT * FROM ${tableName} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};`
    return new Promise(async (resolve, reject) => {
        try {
            let res = await querySQL(sql)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.querySum = function (prams) {
    let {tableName} = prams
    let sql = `SELECT COUNT(*) FROM ${tableName}`
    return new Promise(async (resolve, reject) => {
        try {
            let res = await querySQL(sql)
            let data = {
                sum: res[0]['COUNT(*)']
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}
module.exports.queryKeys = function (prams) {
    return new Promise(async (resolve, reject) => {
        try {
            let {tableName} = prams
            let sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = Database() AND TABLE_NAME = '${tableName}';`
            let res = await querySQL(sql)
            let keys = []
            res.forEach(key => {
                keys.push(key["COLUMN_NAME"])
            });
            // TODO: keys 为空时没有错误
            resolve(keys)
        } catch (error) {
            reject(error)
        }
    });
}
module.exports.queryPrimaryKey = function (prams) {
    let {tableName} = prams
    let sql = `SHOW KEYS FROM ${tableName} WHERE Key_name = 'PRIMARY'`
    return new Promise(async (resolve, reject) => {
        try {
            let res = await querySQL(sql)
            if (res.length) {
                let data = {
                    primaryKey: res[0]['Column_name']
                }
                resolve(data)
            } else {
                reject("primary key don't exits")
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.insertRow = function (prams) {
    return new Promise(async (resolve, reject) => {
        try {
            let {tableName, value} = prams
            let sql = `INSERT INTO ${tableName} SET ?`
            let res = queryByArr(sql, [value])
            resolve(res)
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.queryRowByID = function (prams) {
    let {tableName, id} = prams
    return new Promise(async (resolve, reject) => {
        try {
            let {primaryKey} = await self.queryPrimaryKey({tableName: tableName})
            let sql = `SELECT * FROM ${tableName} WHERE ${primaryKey} = ?;`
            // TODO: queryByArr,res is null
            let res = await queryByArr(sql, [id])
            resolve(res)
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.deleteRow = function (prams) {
    let {tableName, id} = prams
    return new Promise(async (resolve, reject) => {
        try {
            let {primaryKey} = await this.queryPrimaryKey({tableName: tableName})
            let sql = `DELETE FROM ${tableName} WHERE ${primaryKey} = ${id};`
            // TODO: id is null
            let res = await querySQL(sql)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.updateRow = function (prams) {
    return new Promise(async (resolve, reject) => {
        try {
            let {tableName, id, value} = prams
            let {primaryKey} = await self.queryPrimaryKey({tableName: tableName})
            let sql = `UPDATE ${tableName} SET ? WHERE ${primaryKey} = ${id}`
            // TODO: check value
            let res = queryByArr(sql, value)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    });
}


module.exports.checkPassword = function (prams) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `SELECT * FROM admin WHERE email = ? AND password = ?`
            let res = await queryByArr(sql, [prams.email, prams.password])
            if (res.length) {
                resolve(res)
            } else {
                reject("邮箱或密码错误")
            }
        } catch (error) {
            reject(error)
        }
    })
}