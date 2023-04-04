import e from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export interface ServerToClientEvents {
  message: (msg: string) => void;
  "clients-updated": (info: {
    username: string | undefined;
    currentRoom: string | undefined;
  }) => void;
  "current-room-users-updated": (
    users: { id: string | undefined; name: string | undefined }[]
    /**
     * server.Alls
     */
  ) => void;
  "current-room-message-updated": (
    messages: { content: string; sender: string }[]
  ) => void;
}
export interface ClientToServerEvents {
  "set-username": (username: string) => void;
  "join-room": (roomname: string) => void;
  "room-data-updated": (roomname: string) => void;
  "send-to-current-room": (msg: string) => void;
  "send-to-all": (msg: string) => void;
  "send-to-other": (msg: string) => void;
  "send-to-me": (msg: string) => void;
}
export interface InterServerEvents {
  ping: () => void;
}
export interface SocketData {
  username: string;
  currentRoom: string;
}

export type ServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

type IO = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
export default class TheServer {
  private static io: IO | undefined = undefined;
  private constructor() {
    TheServer.io = undefined;
  }
  public static get instance() {
    if (this.io === undefined) {
      this.io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >(http.createServer(e()), {
        cors: {
          origin: "*",
        },
      });
      this.io.listen(3000);
      console.log("server is running on port 3000");
    }
    return this.io;
  }
}
