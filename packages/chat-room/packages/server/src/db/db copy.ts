import fs from "fs";

type User = {
  id: string;
  name: string;
};
type Message = {
  content: string;
  sender: string;
};
type Room = {
  name: string;
  users: User[];
  messages: Message[];
};
type DB = {
  rooms: Room[];
};

class DBJson {
  public static db: DB = DBJson.getJsonFile("./src/db/db.json");
  constructor() {
    return;
  }
  public static getJsonFile(path: string) {
    const buffer: string = fs.readFileSync(path).toString();
    return JSON.parse(buffer);
  }
  insterRoom(roomname: string) {
    DBJson.db.rooms.push({
      name: roomname,
      users: [],
      messages: [],
    });
  }
}
