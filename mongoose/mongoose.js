'use strict'

const mongoose = require('mongoose');
const schemas = require('require-all')({
    dirname: __dirname+ '/schema'
});

class Mongoose {
    constructor() {
        this.url = 'mongodb://localhost:27017/llkl';
    }

    conn() {
        try {
            mongoose.connect(this.url, {
                useNewUrlParser: true,
                bufferMaxEntries: 0,
                autoReconnect: true,   // default is true, you can ignore it
                poolSize: 5,           // default is 5, you can ignore it
            });

            return mongoose;
        } catch (e) {
            throw e;
        }
    }

    registerSchema() {
        let mongoose = this.conn();
        Object.keys(schemas).forEach(function(key) {
            try {
                if (typeof schemas[key] == "object" && typeof schemas[key].run == "function") {
                    schemas[key].register(mongoose);
                }
            } catch (e) {
                throw e;
            }
        });
    }
}

module.exports = (()=>{
    let mongoose = new Mongoose();
    mongoose.registerSchema();

    return mongoose;
})();