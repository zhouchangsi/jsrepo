import TheServer, { ServerSocket } from "./TheServer";
const server = TheServer.instance;
export const configSocket = () => {
  server.on("connection", (socket) => {
    socket.data.currentRoom = "Defult room";

    socket.on("join-room", (roomname) => {
      socket.data.currentRoom = roomname;
      // TODO: update users in current room for storage
    });
    socket.on("send-to-current-room", (msg) => {
      server.to(socket.data.currentRoom as string).emit("message", msg);
    });
    socket.on("send-to-all", (msg) => {
      server.emit("message", msg);
    });
    socket.on("send-to-other", (msg) => {
      socket.broadcast.emit("message", msg);
    });
    socket.on("send-to-me", (msg) => {
      socket.emit("message", msg);
    });
    socket.on("set-username", (username) => {
      socket.data.username = username;
    });
    socket.on("sync-data", (roomname) => {
      server.to(roomname).emit("clients-updated", {
        username: socket.data.username,
        currentRoom: socket.data.currentRoom,
      });
    });
  });
};
