'use strict'

class Autoload {
    constructor() {

    }

    run(io) {
        let consumers = require('require-all')({
            dirname: __dirname + '/consumer'
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
    return new Autoload();
})();