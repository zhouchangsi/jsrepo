export interface UserInterface {
    id: number;
    name: string;
    currentRoom: string;
}

export interface MessageInterface {
    sender: string;
    text: string;
}

export interface RoomInterface {
    id: number;
    name: string;
    userIdSet: Set<number>;
    msgList: MessageInterface[];
}

class User implements UserInterface {
    id: number;
    name: string;
    currentRoom: string;
}

class Message implements MessageInterface {
    sender: string;
    text: string;
    constructor(sender: string, text: string) {
        this.sender = sender || "system";
        this.text = text || "unknow";
    }
}

class Room implements RoomInterface {
    id: number;
    name: string;
    userIdSet: Set<number>;
    msgList: MessageInterface[];

    private static MAX_ID: number = 0;
    public static ROOM_SET: Set<number> = new Set();
    constructor(name: string) {
        this.id = Room.MAX_ID++;
        Room.ROOM_SET.add(this.id);
        this.name = name || "unknow";
    }
    joinRoom(id: number) {
        this.userIdSet.add(id);
    }
    leaveRoom(id: number) {
        this.userIdSet.delete(id);
    }
    addMessage(msg: MessageInterface) {
        this.msgList.push(msg);
    }
}
