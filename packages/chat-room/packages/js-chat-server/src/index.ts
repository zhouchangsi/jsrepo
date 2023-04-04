// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const { instrument } = require("@socket.io/admin-ui");
// const path = require("path");
// const memory = require("./memory");
// const icmp = require("./icmp.js");
import e from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import * as memory from "./memory";
import * as icmp from "./icmp";
import { UserInterface, MessageInterface, RoomInterface } from "./memory";

const app = e();
app.use(e.static(path.join(__dirname, "public")));
// socket create
const server = http.createServer(app);
const io = new Server(server, {
    // 跨域请求
    cors: {
        origin: "*",
        // methods: ['GET', "POST"]
    },
});

let user_summary = 0;
io.on("connection", (socket) => {
    console.log(socket.id, "connecting......");
    user_summary++;
    socket.currentRoom = "默认房间";
    socket.username = `[${socket.id}]`;
    initSocket(socket);

    // setting
    socket.on("setUserName", (name: string) => {
        setName(socket, name);
        let usersMap: Map<string, UserInterface> = new Map();
        if (usersMap.has(socket.id)) {
            usersMap.get(socket.id)!.name = name;
        } else {
            console.log("ERROR in socket.on setUserName");
        }
    });
    socket.on("joinRoom", (roomName) => {
        leaveRoom(socket);
        joinRoom(socket, roomName);
    });

    socket.on("syncData", (room) => {
        syncData(socket, room);
    });

    // send message
    socket.on("send-message-in-current-room", (msg) => {
        memory.pushMegInRoom(socket.currentRoom, socket.username, msg.text);
        socket.emit("message", msg);
        syncData(socket);
    });

    socket.on("send to all", (msg) => {
        io.emit("message", msg);
    });
    socket.on("send to other", (msg) => {
        socket.broadcast.emit("message", msg);
    });

    // handle ping
    handlePing(socket);
    // disconnect
    socket.on("disconnecting", () => {
        user_summary--;
        leaveRoom(socket);
        syncData(socket);
    });
});

function initSocket(socket) {
    joinRoom(socket, socket.currentRoom);

    syncData(socket);

    console.log(`client connect ^^^^^ ${socket.id}`);
}

function joinRoom(socket, roomName) {
    socket.leave(socket.currentRoom);
    socket.currentRoom = roomName;
    socket.join(roomName);
    memory.joinRoom(socket, roomName);
}

function leaveRoom(socket) {
    socket.leave(socket.currentRoom);
    memory.leaveRoom(socket.currentRoom, socket.id);
    syncData(socket);
}

function syncData(socket) {
    syncClientInfo(socket);
    syncCurrentRoomUsers(socket);
    syncCurrentRoomMegs(socket);
    syncRoomNameList();
}

function syncClientInfo(socket) {
    let clientInfo = {
        username: socket.username,
        currentRoom: socket.currentRoom,
    };
    socket.emit("client-info", clientInfo);
}

function syncCurrentRoomUsers(socket) {
    let userMap = memory.getUserMapInRoom(socket.currentRoom);
    let userList = memory.getMapValueToArray(userMap);
    io.to(socket.currentRoom).emit("current-room-users", userList);
}

function syncCurrentRoomMegs(socket) {
    let megList = memory.getMegArrInRoom(socket.currentRoom);
    io.to(socket.currentRoom).emit("current-room-megs", megList);
}

function syncRoomNameList() {
    let roomMap = memory.getRoomMap();
    let roomList = memory.getMapKeyToArray(roomMap);
    io.emit("room-name-list", roomList);
}

function setName(socket, name) {
    socket.username = name;
    memory.getUserMapInRoom(socket.currentRoom).set(socket.id, socket.username);
    syncData(socket);
}

function handlePing(socket) {
    socket.on("ping", (data) => {
        icmp.pingOption = data.pingOption;
        icmp.ping(socket, data.domain, icmp.pingOption);
    });
}

// server.listen(3000)
io.listen(3000);
console.log("\n\n\n\n\n\n\nRun server on _____ http://localhost:3000");
