import { io } from "socket.io-client";

const socket = io("ws://localhost:3000") // when other device like
// android connect
// const socket = io("http://localhost:3000") // when localhost connect

export default socket
