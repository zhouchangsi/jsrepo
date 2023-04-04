// let test_roomList = [
//     {
//         domain: "默认房间",
//         usersInRoom: [
//             "默认房间 user 1",
//             "默认房间 user 2",
//             "默认房间 user 3"
//         ],
//         msgsInRoom: [
//             {
//                 sender: "默认房间 Sender",
//                 text: "默认房间 Text"
//             }
//         ]
//     },
//     {
//         domain: "房间1",
//         usersInRoom: [
//             "房间1 user 1",
//             "房间1 user 2",
//             "房间1 user 3"
//         ],
//         msgsInRoom: [
//             {
//                 sender: "房间1 sender1",
//                 text: "房间1 text1"
//             },
//             {
//                 sender: "房间1 sender2",
//                 text: "房间1 text2"
//             }
//         ]
//     },
//     {
//         domain: "房间2",
//         usersInRoom: [
//             "i am user 211",
//             "i am user 22",
//             "i am user 23"
//         ],
//         msgsInRoom: [
//             {
//                 sender: "i am msgInRoom[0].sender",
//                 text: "i am msgInRoom[0].text"
//             },
//             {
//                 sender: "i am msgInRoom[1].sender",
//                 text: "i am msgInRoom[1].text"
//             }
//         ]
//     }
// ]

function Msg(sender, text) {
    this.sender = sender ? sender : "? sender"
    this.text = text ? text : "? text"
}

function Room(usersInRoom, msgsInRoom) {
    this.usersInRoom = usersInRoom ? usersInRoom : new Map()
    this.msgsInRoom = msgsInRoom ? msgsInRoom : [new Msg()]
}

let test_roomList = new Map()

let roomList = function () {
    return test_roomList
}

let setRoom = function (userObj, roomName) {
    test_roomList.set(roomName, new Room())
    findUsersInRoom(roomName).set(userObj.id, userObj.username)
    findMsgsInRoom(roomName).push(
        new Msg(userObj.username, `${userObj.id} 加入 ${roomName}`)
    )
}

let leaveRoom = function (roomName, userName) {
    findUsersInRoom(roomName).delete(userName)
}

let pushMsgInRoom = function (roomName, msg) {
    let data = msg ? msg : new Msg()
    findMsgsInRoom(roomName).push(msg)
}

let setName = function () {

}

let findRoom = function (roomname) {
    return test_roomList.get(roomname)
}

let findUsersInRoom = function (roomname) {
    return test_roomList.get(roomname).usersInRoom
}

let findMsgsInRoom = function (roomname) {
    return test_roomList.get(roomname).msgsInRoom
}

let init = function () {
    test_roomList.set('vue-room', new Room())
    findUsersInRoom("vue-room").set("? id", "? domain")
}
init()
export {test_roomList, roomList}