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

class JsonDB {
  public static db: DB | undefined;
  private static _room: Room | { user: (name: string) => User[] } | undefined;
  private static _user: User | undefined;
  private static _massage: Message | undefined;
  private constructor() {
    return;
  }
  static get rooms() {
    return JsonDB.db?.rooms;
  }
  static room(roomname: string) {
    JsonDB._room = JsonDB.rooms?.find((room) => room.name === roomname);
    JsonDB._room.user = (name: string) => {
      return JsonDB._room.users.find((user) => user.name === name);
    };

    return JsonDB;
  }
  static user(name: string) {
    return JsonDB._room?.users.find((user) => user.name === name);
  }
  static get messages() {
    return JsonDB._room?.messages;
  }
}

const path = "./src/db/db.json";

const getObjectFromJson = (path: string, log: boolean) => {
  const buffer = fs.readFileSync(path),
    jsonObeject = JSON.parse(buffer.toString());
  if (log) console.dir(jsonObeject, { depth: null });

  return jsonObeject;
};

const writeObjectToJson = (path: string, obj: unknown) => {
  fs.writeFileSync(path, JSON.stringify(obj, undefined, 2));
};

const jo = getObjectFromJson(path, true);
jo.rooms.push({ name: "room 2" });
writeObjectToJson(path, jo);
