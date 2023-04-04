import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        socketId: "无连接",
        currentUser: "无用户",
        currentRoom: "无房间",
        currentRoomMegs: ["无房间"],
        currentRoomUsers: ["无用户"],
        roomNameList: ["无房间"],
        pingOption:{
            networkProtocol: "IPv4", // 协议
            packetSize: 32, // 发送包的大小
            retries: 1, // 重试次数
            sessionId: (process.pid % 65535), // 独一无二的session Id
            timeout: 2000, // 超时时间
            ttl: 128 // 生存时间值
        },
    },
    mutations: {
        mod_data(state, fn) {
            fn(state)
        },
    },
    actions: {},
    modules: {}
})
