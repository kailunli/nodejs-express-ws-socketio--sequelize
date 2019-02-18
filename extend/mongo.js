'use strict'

const mongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

class Mongo {
    constructor() {
        // Connection URL
        this.url = 'mongodb://localhost:27017';
        // this.url = 'mongodb://user:password@127.0.0.1:27017/dbname';
    }

    conn(callback) {
        try {
            mongoClient.connect(this.url, {
                useNewUrlParser: true,
                bufferMaxEntries: 0,
                autoReconnect: true,   // default is true, you can ignore it
                poolSize: 5,           // default is 5, you can ignore it
            }, function (err, client) {
                /*if (typeof callback == "function") {
                    callback(err, client);
                }
                client.close();*/
            });

            return mongoClient;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = (()=>{
    return new Mongo();
})();