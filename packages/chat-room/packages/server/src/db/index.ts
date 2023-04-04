import fs from "fs";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

const getJsonFile = (path: string) => {
  const bufferString: string = fs.readFileSync(path).toString();
  return JSON.parse(bufferString);
};

const db = getJsonFile("./src/db/db.json");
console.log(db);

const setJson = (object: Record<string, unknown>, path: string) => {
  const stringifyObject = JSON.stringify(object);
  fs.writeFileSync(path, stringifyObject);
};

const RoomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    name: { type: GraphQLString },
    users: { type: GraphQLString },
    messages: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    room: {
      type: RoomType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // TODO: return room by name
        // getRoom({roomname:args.name})
        return {};
      },
    },
    rooms: {
      type: new GraphQLList(RoomType),
      resolve(parentValue, args) {
        // TODO: return rooms
        return; // getRooms();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addRoom: {
      type: RoomType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        users: { type: new GraphQLList(GraphQLString) },
        messages: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, args) {
        return; /** addRoom({
            name:args.name,
            users:args.users,
            messages:args.messages,
        }) */
      },
    },
    deleteRoom: {
      type: RoomType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return; /**
            deleteRoom({roomname:args.name})
        */
      },
    },
    editRoomname: {
      type: RoomType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return; /**
            setRoomname(args.name)
        */
      },
    },
  },
});
