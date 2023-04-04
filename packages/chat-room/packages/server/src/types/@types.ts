import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../TheServer";
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>