'use strict'

const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

class Mongo {
    constructor() {
        // Connection URL
        this.url = 'mongodb://localhost:27017';
        // this.url = 'mongodb://user:password@127.0.0.1:27017/dbname';
    }

    conn(callback) {
        MongoClient.connect(this.url, function (err, client) {
            if (typeof callback == "function") {
                callback(err, client);
            }
            client.close();
        })
    }
}

module.exports = (()=>{
    return new Mongo();
})();