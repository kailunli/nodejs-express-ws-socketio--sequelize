'use strict'

class Consumer {
    constructor() {

    }

    start(io) {
        let consumers = require('require-all')({
            dirname: __dirname + '/application/consumer'
        });

        Object.keys(consumers).forEach(function (key) {
            (()=>{
                try {
                    if (typeof consumers[key] == "object" && typeof consumers[key].run == "function") {
                        consumers[key].run(io);
                    }
                } catch (e) {
                    throw e;
                }
            })();
        });
    }
}

module.exports = (()=>{
    return new Consumer();
})();