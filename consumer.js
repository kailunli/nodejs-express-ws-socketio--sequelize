'use strict'

class Consumer {
    constructor() {

    }

    start(io) {
        let consumers = require('require-all')({
            dirname: __dirname + '/application/consumer'
        });

        Object.keys(consumers).forEach(function (key) {
            (async ()=>{
                try {
                    await consumers[key].run(io);
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