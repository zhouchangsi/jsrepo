import { io } from "socket.io-client";
import { describe, it } from "vitest";
import { ClientSocket } from "../@types";

const client: ClientSocket = io("http://localhost:3000");
describe("Socket server should work", () => {
  it("join room", () => {
    const roomname = "room 1";
    const msg = "this is msg";
    client.emit("join-room", roomname);
    client.emit("send-to-all", msg);
    client.emit("send-to-current-room", msg);
    client.emit("send-to-me", msg);
    client.emit("send-to-other", msg);
    client.emit("set-username", msg);
    client.emit("room-data-updated", roomname);
  });
});
