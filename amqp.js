'use strict'

let amqpConf = require('./application/amqp_conf');

module.exports = (async ()=>{
    return await require('amqplib').connect(amqpConf.host);
})();