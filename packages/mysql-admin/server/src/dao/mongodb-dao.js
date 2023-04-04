const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const CONFIG = {
    dbUrl: 'mongodb://127.0.0.1:27017/',
    dbName: 'chat_room'
};

class DB {
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    constructor() {
        this.dbClient = '';
        this.connect().catch();
    }

    connect() {
        let self = this;
        return new Promise(((resolve, reject) => {
            if (!self.dbClient) {
                MongoClient.connect(CONFIG.dbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        self.dbClient = client.db(CONFIG.dbName);
                        resolve(self.dbClient);
                    }
                })
            } else {
                resolve(self.dbClient);
            }
        }))
    }

    insertDocuments(collectionName, jsonArr) {
        if (!collectionName || !jsonArr || !(jsonArr instanceof Array)) throw '参数错误';
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                const collect = db.collection(collectionName);
                collect.insertMany(jsonArr, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                })
            })
        })
    }

    findDocuments(collectionName, json) {
        if (!collectionName || !json) throw '参数错误';
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(collectionName).find(json);
                result.toArray((err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            })
        })
    }

    removeDocument(collectionName, json) {
        if (!collectionName || !json) throw '参数错误';
        return new Promise(((resolve, reject) => {
            this.connect().then(db => {
                const collection = db.collection(collectionName);
                collection.deleteMany(json, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                })
            })
        }))
    }

    updateDocument(collectionName, filter, json) {
        if (!collectionName || !filter || !json) throw '参数错误';
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                const collection = db.collection(collectionName);
                collection.updateOne(filter, {$set: json}, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }

    getObjectId(id) {    /*mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id);
    }
}

module.exports = DB.getInstance();