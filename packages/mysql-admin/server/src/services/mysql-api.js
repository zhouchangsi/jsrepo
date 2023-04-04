const mysqlDao = require("../dao/mysql-dao");
const mysqlApi = function (app) {
    // 接口名称不应使用动词，而是定位资源
    // GET （SELECT）：从服务器检索特定资源，或资源列表。
    // POST （CREATE）：在服务器上创建一个新的资源。
    // PUT （UPDATE）：更新服务器上的资源，提供整个资源。
    // PATCH （UPDATE）：更新服务器上的资源，仅提供更改的属性。
    // DELETE （DELETE）：从服务器删除资源。
    // 规则1：URI结尾不应包含（/）
    // 规则2：正斜杠分隔符（/）必须用来指示层级关系
    // 规则3：应使用连字符（ - ）来提高URI的可读性
    // 规则4：不得在URI中使用下划线（_）
    // 规则5：URI路径中全都使用小写字母
    // TODO: 重构形式
    function createAPI(app, url, callback) {
        app.get(url, async (req, res) => {
            try {
                let result = await callback(req.params);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
    }

    // createAPI(app, "/mysql/page/:tableName/:pageSize/:page", mysqlDao.queryPageOfTable)
    let apiGet = [
        {
            url: "/mysql/page/:tableName/:pageSize/:page",
            result: mysqlDao.queryPage
        },
        {
            url: "/mysql/sum/:tableName",
            result: mysqlDao.querySum
        },
        {
            url: "/mysql/keys/:tableName",
            result: mysqlDao.queryKeys
        },
        {
            url: "/mysql/primary-key/:tableName",
            result: mysqlDao.queryPrimaryKey
        },
        {
            url: "/mysql/id/:tableName/:id",
            result: mysqlDao.queryRowByID
        }
    ]
    apiGet.forEach(el => {
        createAPI(app, el.url, el.result)
    })
    // TODO: RESTFul api
    app.delete("/mysql/id/:tableName/:id", async (req, res) => {
        try {
            let result = await mysqlDao.deleteRow(req.params)
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    })
    app.post("/mysql/insert", async (req, res) => {
        try {
            let result = await mysqlDao.insertRow(req.body)
            res.send(result)
        } catch (error) {
            // res.send(error)
            res.status(500).send(error)
        }
    })
    // TODO: RESTFul api
    app.put("/mysql/update", async (req, res) => {
        try {
            let result = await mysqlDao.updateRow(req.body)
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    })
    app.post("/mysql/login", async (req, res) => {
        try {
            let result = await mysqlDao.checkPassword(req.body)
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    })
}

module.exports = {mysqlApi}