const {Server} = require("socket.io")
module.exports.initSocketServer = (server) => {
// socket create
    const io = new Server(server, {
        // 跨域请求
        cors: {
            origin: "*",
            // methods: ['GET', "POST"]
        }
    })
// socket 响应
    io.on("connection", socket => {
        socket.userName = "first socket"
    })
}