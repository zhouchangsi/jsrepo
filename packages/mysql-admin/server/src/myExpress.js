const http = require("http")
const express = require("express")
const cors = require("cors")
const Mock = require("mockjs")

const mySocketIO = require("./mySocketIO.js")

const {mysqlApi} = require("./services/mysql-api")
/**
 * create express server<br>
 * **/
module.exports.initExpress = () => {
    // express configuration
    const app = express()
    app.use(cors()) // 允许跨域请求
    app.use(express.json()) // 允许json
    const PORT = process.env.PORT || 3000
    app.set("port", PORT)

    // setting express api
    // myAPI(app)
    mysqlApi(app)

    // file server
    app.use(express.static('dist'))
    app.get(/.*/, function (req, res) {
        res.sendFile(__dirname + './dist/index.html')
    })

    app.use((req, res, next) => {
        res.status(404).send("this is 404 page")
    })

    // create server
    const server = http.createServer(app)
    mySocketIO.initSocketServer(server)
    server.listen(PORT)
    console.log("server listen on " + PORT)
}