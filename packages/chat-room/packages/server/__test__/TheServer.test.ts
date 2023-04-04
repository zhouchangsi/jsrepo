import { io } from "socket.io-client";
import { ClientSocket } from "../src/@types";

import { it, describe, expect } from "vitest";
import TheServer, { ServerSocket } from "../src/TheServer";

describe("TheServer.ts", () => {
  let client: ClientSocket;
  const server = TheServer.instance;
  let socket: ServerSocket;

  it("Client connected", () =>
    new Promise<void>((done) => {
      server.on("connection", (_socket) => {
        socket = _socket;
        console.log("Socket.id:", socket.id);
      });
      client = io("http://localhost:3000");
      client.on("connect", done);
    }));

  it("Client recive message", () =>
    new Promise<void>((done) => {
      client.on("message", (msg) => {
        expect(msg).toBe("this is a message");
        done();
      });
      socket.emit("message", "this is a message");
    }));

  it("Set username", () =>
    new Promise<void>((done) => {
      socket.on("setUserName", (username) => {
        expect(username).toBe("Mike");
        done();
      });
      client.emit("setUserName", "Mike");
    }));
});
