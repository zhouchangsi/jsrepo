export {};
import TheServer from "./TheServer";
const server = TheServer.instance;
server.on("connection", (socket) => {
  console.log(socket.rooms);

  socket.on("room-data-updated", async () => {
    const users = await server
      .in(socket.data.currentRoom as string)
      .fetchSockets();
  });
});
